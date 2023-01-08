import { IPlaneamentoPersistence } from '../../dataschema/IPlaneamentoPersistence';
import mongoose from 'mongoose';

const PlaneamentoSchema = new mongoose.Schema(
  {
    domainId: {
			type: String,
			unique: true
		},

    matricula: { 
        type: String,
        index: true
    },

    data: {
        type: String,
        index: true,
    },

    armazem: {
        type: String,
        index: true
    },
  },
  { timestamps: true },
);

export default mongoose.model<IPlaneamentoPersistence & mongoose.Document>('Planeamento', PlaneamentoSchema);
