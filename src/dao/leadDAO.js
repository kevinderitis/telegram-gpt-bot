import mongoose from 'mongoose';
import Lead from './models/leadModel.js';
import config from '../config/config.js';

mongoose.connect(config.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});


const createLead = async (mainThreadId, name, chatId) => {
  try {
    let existingLead = await Lead.findOne({ chatId });

    if (!existingLead) {
      const newLead = new Lead({
        mainThreadId,
        name,
        chatId
      });
      await newLead.save();
      console.log('Lead creado exitosamente:', newLead);
      return newLead;
    }
  } catch (error) {
    console.error('Error al crear o actualizar lead:', error.message);
    throw new Error('No se pudo crear o actualizar el lead');
  }
};



const getAllLeads = async () => {
  try {
    const leads = await Lead.find();
    console.log('Leads encontrados:', leads);
    return leads;
  } catch (error) {
    console.error('Error al obtener leads:', error.message);
    throw new Error('No se pudieron obtener los leads');
  }
};

const getLeadById = async (leadId) => {
  try {
    const lead = await Lead.findById(leadId);
    if (!lead) {
      throw new Error('Lead no encontrado');
    }
    console.log('Lead encontrado:', lead);
    return lead;
  } catch (error) {
    console.error('Error al obtener lead por ID:', error.message);
    throw new Error('No se pudo encontrar el lead');
  }
};

const getLeadByChatId = async (chatId) => {
  try {
    const lead = await Lead.findOne({ chatId });
    if (!lead) {
      console.log('Lead no encontrado');
    }
    console.log('Lead encontrado por número de teléfono:', lead);
    return lead;
  } catch (error) {
    console.error('Error al obtener lead por número de teléfono:', error.message);
    throw new Error('No se pudo encontrar el lead por número de teléfono');
  }
};

const updateLeadById = async (leadId, newData) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(leadId, newData, {
      new: true,
    });
    if (!updatedLead) {
      throw new Error('Lead no encontrado');
    }
    console.log('Lead actualizado:', updatedLead);
    return updatedLead;
  } catch (error) {
    console.error('Error al actualizar lead por ID:', error.message);
    throw new Error('No se pudo actualizar el lead');
  }
};

const updateLeadPaymentByChatId = async (chatId, payment) => {
  try {
    const lead = await Lead.findOne({ chatId });

    if (!lead) {
      throw new Error('Lead no encontrado');
    }

    lead.payment = payment;

    await lead.save();

    console.log('Lead actualizado:', lead);
    return lead;
  } catch (error) {
    console.error('Error al actualizar lead por chatId:', error.message);
    throw new Error('No se pudo actualizar el lead');
  }
};

const updateLeadByMainThreadId = async (chatId, threadId) => {
  try {
    const lead = await Lead.findOne({ chatId });

    if (!lead) {
      throw new Error('Lead no encontrado');
    }

    const currentDate = new Date();

    lead.threadId = threadId;
    lead.paymentDate = currentDate;

    await lead.save();

    console.log('Lead actualizado:', lead);
    return lead;
  } catch (error) {
    console.error('Error al actualizar lead por chatId:', error.message);
    throw new Error('No se pudo actualizar el lead');
  }
};

const deleteLeadById = async (leadId) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(leadId);
    if (!deletedLead) {
      throw new Error('Lead no encontrado');
    }
    console.log('Lead eliminado:', deletedLead);
    return deletedLead;
  } catch (error) {
    console.error('Error al eliminar lead por ID:', error.message);
    throw new Error('No se pudo eliminar el lead');
  }
};

const updateManyPayments = async hour => {
  try {
    const result = await Lead.updateMany(
      { payment: true, paymentDate: { $lt: hour } },
      { $set: { payment: false } }
    );
    return result;
  } catch (error) {
    console.error('Error al actualizar payments:', error.message);
    throw new Error('No se pudieron actualizar lead payments');
  }
};

export { createLead, getAllLeads, getLeadById, updateLeadById, deleteLeadById, getLeadByChatId, updateLeadPaymentByChatId, updateLeadByMainThreadId, updateManyPayments };