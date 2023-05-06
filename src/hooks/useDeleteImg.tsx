import { ref, deleteObject } from "firebase/storage";
import storage from "../utils/firebase-utils";
import usePics from "./usePics";

type useDeleteImgType = {
  isSuccess: boolean;
  error?: any;
};

const useDeleteImg = () => {
  const { pics, setPics } = usePics();

  const deleteImg = async (
    user: string,
    imgType: "cover" | "profile" | "post",
    imgName: string
  ) => {
    const key = `${user}_${imgType}_${imgName}`;
    const retVal: useDeleteImgType = {
      isSuccess: false,
    };

    try {
      const folderLocation = `/${imgType}-pics`;
      const storageRef = ref(storage, `${folderLocation}/${imgName}`);

      await deleteObject(storageRef);
      retVal.isSuccess = true;

      if (pics.has(key)) {
        setPics((prevPics) => {
          const newPics: Map<string, string> = new Map(
            JSON.parse(JSON.stringify(Array.from(prevPics)))
          );

          newPics.delete(key);

          return newPics;
        });
      }
    } catch (error: any) {
      retVal.error = error;
    }

    return retVal;
  };

  return deleteImg;
};

export default useDeleteImg;
