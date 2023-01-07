import { saveAs } from 'file-saver';
import { apiUrl } from '../../services/constant';

export const downLoadClaim = (svhcode:string) => {
  saveAs(apiUrl + '/claim/report/'+ svhcode +'/claim.docx', svhcode + ".docx");
}