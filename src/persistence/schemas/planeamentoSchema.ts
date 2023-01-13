import { IPlaneamentoPersistence } from '../../dataschema/IPlaneamentoPersistence';
import mongoose from 'mongoose';

const PlaneamentoSchema = new mongoose.Schema(
  {
    Matricula: { 
        type: String,
        index: true
    },

    Data: {
        type: String,
        index: true,
    },

    Armazem: {
        type: String,
        index: true
    },
  },
  { timestamps: true },
);

export default mongoose.model<IPlaneamentoPersistence & mongoose.Document>('Planeamento', PlaneamentoSchema);
