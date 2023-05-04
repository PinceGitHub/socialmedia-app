import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../utils/firebase-utils";
import moment from "moment";

type useUploadImgType = {
  isSuccess: boolean;
  imgName: string;
  imgUrl: string;
  error?: any;
};

const useUploadImg = () => {
  const upload = async (
    user: string,
    imgType: "cover" | "profile" | "post",
    imgFile: File
  ) => {
    const folderLocation = `/${imgType}-pics`;
    const fileName = `${user}_${moment().format("yyyyMMDDHHmmss")}_${
      imgFile.name
    }`;
    const storageRef = ref(storage, `${folderLocation}/${fileName}`);
    const retVal: useUploadImgType = {
      isSuccess: false,
      imgName: "",
      imgUrl: "",
    };

    try {
      const renamedFile = new File([imgFile], fileName, { type: imgFile.type });
      const uploadTask = await uploadBytes(storageRef, renamedFile);

      retVal.isSuccess = true;
      retVal.imgName = fileName;
      retVal.imgUrl = await getDownloadURL(uploadTask.ref);
    } catch (error: any) {
      retVal.error = error;
    }

    return retVal;
  };

  return upload;
};

export default useUploadImg;
