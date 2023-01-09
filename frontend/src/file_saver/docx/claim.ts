import { apiUrl } from "./../../services/constant";
import { saveAs } from "file-saver";

export const downLoadClaim = (svhcode:string) => {
  saveAs(apiUrl + "/claim/report/" + svhcode +"/claim.docx", svhcode + ".docx");
}

export const downLoadSubClaim = (codesub:string) => {
  saveAs(apiUrl + "/claim/report/subclaim/" + codesub + "/subclaim.docx", codesub + ".docx");
}