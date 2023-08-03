const Participant = require("../../api/v1/participants/model")
const Events = require("../../api/v1/event/model")
const Orders = require("../../api/v1/orders/model")
const Payments = require("../../api/v1/payment/model")

const { Unauthorized, BadRequestError, NotFoundError } = require("../../errors")
const { createJWT, createTokenParticipant } = require("../../utils")
const { otpMail, orderMail } = require("../mail")

const siginupParticipant = async (req) => {
  const { fristName, lastName, email, password, role } = req.body

  let result = await Participant.findOne({
    email,
    status: 'tidak aktif'
  })

  if (result) {
    result.fristName = fristName;
    result.lastName = lastName;
    result.email = email;
    result.password = password;
    result.otp = Math.floor(Math.random() * 9999);
    await result.save()
  } else {
    result = await Participant.create({
      fristName,
      lastName,
      email,
      password,
      role,
      otp: Math.floor(Math.random() * 9999)
    })
  }

  await otpMail(email, result)

  delete result._doc.password
  delete result._doc.otp
  return result
}

const activatePartisipant = async (req) => {
  const { otp, email } = req.body
  const check = await Participant.findOne({ email })

  if (!check) throw new NotFoundError("Participant belom terdaftar")

  if (check && check.otp !== otp) throw new NotFoundError("Kode otp slah")

  const result = await Participant.findByIdAndUpdate(
    check._id,
    {
      status: 'aktif'
    },
    { new: true }
  )
  delete result._doc.password

  return result
}

const siginParticipant = async (req) => {
  const { email, password } = req.body

  if (!email || !password) throw new BadRequestError('Please provide email and password')

  const result = await Participant.findOne({ email: email })

  if (!result) throw new Unauthorized('Invalid creadential')

  if (result.status === 'tidak aktif') throw new Unauthorized(' Akun anda belum aktif')

  const isPasswordCorrect = await result.comparePassword(password)

  if (!isPasswordCorrect) throw new Unauthorized('Invalid creadential')

  const token = createJWT({ payload: createTokenParticipant(result) })

  return token
}

const getAllEvent = async (req) => {
  const result = await Events.find({ statusEvent: 'Published' })
    .populate('category')
    .populate('image')
    .populate('_id title date tickets venueName')

  return result
}

const getOneEvent = async (req) => {
  const { id } = req.params

  const result = await Events.findOne({ _id: id })
    .populate('category')
    .populate({ path: 'talent', populate: 'image' })
    .populate('image')

  if (!result) throw new NotFoundError(`Tidak ada acara dengan id : ${id}`)

  return result
}

const getAllOrder = async (req) => {
  console.log(req.participant)
  const result = await Orders.find({ participant: req.participant.id })

  return result
}

const checkoutOrder = async (req) => {
  const { event, personalDetail, payment, tickets, email } = req.body;

  const checkingEvent = await Events.findOne({ _id: event });
  if (!checkingEvent) {
    throw new NotFoundError('Tidak ada acara dengan id : ' + event);
  }

  const checkingPayment = await Payments.findOne({ _id: payment });

  if (!checkingPayment) {
    throw new NotFoundError(
      'Tidak ada metode pembayaran dengan id :' + payment
    );
  }

  let totalPay = 0,
    totalOrderTicket = 0;
  await tickets.forEach((tic) => {
    checkingEvent.tickets.forEach((ticket) => {
      if (tic.ticketCategories.type === ticket.type) {
        if (tic.sumTicket > ticket.stock) {
          throw new NotFoundError('Stock event tidak mencukupi');
        } else {
          ticket.stock -= tic.sumTicket;

          totalOrderTicket += tic.sumTicket;
          totalPay += tic.ticketCategories.price * tic.sumTicket;
        }
      }
    });
  });

  await checkingEvent.save();

  const historyEvent = {
    title: checkingEvent.title,
    date: checkingEvent.date,
    about: checkingEvent.about,
    tagline: checkingEvent.tagline,
    keyPoint: checkingEvent.keyPoint,
    venueName: checkingEvent.venueName,
    tickets: tickets,
    image: checkingEvent.image,
    category: checkingEvent.category,
    talent: checkingEvent.talent,
    organizer: checkingEvent.organizer,
  };

  const result = new Orders({
    date: new Date(),
    personalDetail: personalDetail,
    totalPay,
    totalOrderTicket,
    orderItems: tickets,
    participant: req.participant.id,
    event,
    historyEvent,
    payment,
  });

  await result.save();
  await orderMail(email, result)
  return result;
};

const getAllPaymentByOrganizer = async (req) => {
  const { organizer } = req.params

  const result = await Payments.find({ organizer: organizer })

  return result
}
module.exports = {
  siginupParticipant,
  activatePartisipant,
  siginParticipant,
  getAllEvent,
  getOneEvent,
  getAllOrder,
  checkoutOrder,
  getAllPaymentByOrganizer
}