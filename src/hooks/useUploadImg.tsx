import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../utils/firebase-utils";
import moment from "moment";
import usePics from "./usePics";

type useUploadImgType = {
  isSuccess: boolean;
  imgName: string;
  imgUrl: string;
  error?: any;
};

const useUploadImg = () => {
  const { setPics } = usePics();

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

      const key = `${user}_${imgType}_${fileName}`;

      setPics((prevPics) => {
        const newPics: Map<string, string> = new Map(
          JSON.parse(JSON.stringify(Array.from(prevPics)))
        );

        if (!newPics.has(key)) {
          newPics.set(key, retVal.imgUrl);
        }

        return newPics;
      });
    } catch (error: any) {
      retVal.error = error;
    }

    return retVal;
  };

  return upload;
};

export default useUploadImg;
