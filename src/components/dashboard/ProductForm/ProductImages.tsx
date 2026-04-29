import { Upload } from "lucide-react";

const ProductImages = ({ form, setForm }: any) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">

        <label>
          <input
            type="file"
            hidden
            onChange={(e) =>
              setForm({ ...form, image: e.target.files?.[0] })
            }
          />
          <div className="h-24 border-dashed border flex justify-center items-center">
            <Upload />
          </div>
        </label>

        <label>
          <input
            type="file"
            hidden
            onChange={(e) =>
              setForm({ ...form, image2: e.target.files?.[0] })
            }
          />
          <div className="h-24 border-dashed border flex justify-center items-center">
            <Upload />
          </div>
        </label>

      </div>

      <div className="flex gap-3 mt-3">
        {(form.image || form.imageUrl) && (
          <img
            src={
              form.image
                ? URL.createObjectURL(form.image)
                : form.imageUrl
            }
            className="h-20 w-20 object-cover rounded"
          />
        )}

        {(form.image2 || form.image2Url) && (
          <img
            src={
              form.image2
                ? URL.createObjectURL(form.image2)
                : form.image2Url
            }
            className="h-20 w-20 object-cover rounded"
          />
        )}
      </div>
    </>
  );
};

export default ProductImages;