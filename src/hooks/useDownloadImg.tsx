import { ref, getDownloadURL } from "firebase/storage";
import storage from "../utils/firebase-utils";
import usePics from "./usePics";

type useDownloadImgType = {
  isSuccess: boolean;
  imgUrl: string;
  error?: any;
};

const useDownloadImg = () => {
  const { setPics } = usePics();

  const getImgUrl = async (
    user: string,
    imgType: "cover" | "profile" | "post",
    imgName: string
  ) => {
    const key = `${user}_${imgType}`;
    const retVal: useDownloadImgType = {
      isSuccess: false,
      imgUrl: "",
    };

    const folderLocation = `/${imgType}-pics`;
    const storageRef = ref(storage, `${folderLocation}/${imgName}`);

    try {
      retVal.imgUrl = await getDownloadURL(storageRef);
      retVal.isSuccess = true;

      setPics((prevPics) => {
        const newPics: Map<string, string> = new Map(
          JSON.parse(JSON.stringify(Array.from(prevPics)))
        );

        if (newPics.has(key)) {
          newPics.delete(key);
        }

        newPics.set(key, retVal.imgUrl);

        return newPics;
      });
    } catch (error: any) {
      retVal.error = error;
    }

    return retVal;
  };

  return getImgUrl;
};

export default useDownloadImg;
