import cloudinary from "cloudinary";
import axios from "axios";
import uploadImage from "@/modules/daybook/helpers/uploadImage";

cloudinary.config({
    cloud_name: "nautilux24",
    api_key: "484512575795893",
    api_secret: "bTwJv9ksc02kAidYMJ65hulQnYI",
});

describe("Pruebas en el UploadImage", () => {
    test("debe de cargar un archivo y retornar el url", async(done) => {
        const { data } = await axios.get(
            "https://res.cloudinary.com/nautilux24/image/upload/v1635734281/ehcv5vr3swedvdimygk4.jpg", {
                responseType: "arraybuffer",
            }
        );

        const file = new File([data], "foto.jpg");

        const url = await uploadImage(file);

        expect(typeof url).toBe("string");

        const segments = url.split("/");

        const imageId = segments[segments.length - 1].replace(".jpg", "");

        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done();
        });
    });
});