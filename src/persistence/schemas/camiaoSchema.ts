import { ICamiaoPersistence } from '../../dataschema/ICamiaoPersistence';
import mongoose from 'mongoose';

const CamiaoSchema = new mongoose.Schema(
  {
    matricula: { 
        type: String,
        index: true,
        unique: true,
        writable: true
    },

    caracteristica: {
        type: String,
        index: true,
        writable: true
    },

    autonomia: {
        type: Number,
        index: true,
        writable: true
    },

    capacidadeTransporte: {
        type: Number,
        index: true,
        writable: true
    },

      capacidadeBateria: {
          type: Number,
          index: true,
          writable: true
      },

      tara: {
          type: Number,
          index: true,
          writable: true

      },

      tempoCarregamento: {
          type: String,
          index: true,
          writable: true
      },
  },
  { timestamps: true },
);

export default mongoose.model<ICamiaoPersistence & mongoose.Document>('Camiao', CamiaoSchema);
