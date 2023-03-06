import { Button, Modal } from "flowbite-react";
import { ReactElement, useState } from "react";
import { Control, FieldError, useController } from "react-hook-form";
import VibrantImage from "../VibrantImage/VibrantImage";

export interface IRenderTriggerArgs {
  onClick: () => void;
  error?: FieldError;
}

interface IModalAddBannerProps {
  renderTrigger: (args: IRenderTriggerArgs) => ReactElement;
  value?: string;
  onSubmit: (value?: string) => void;
  control: Control<any>;
}

const images = [
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_1.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_2.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_3.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_4.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_5.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_6.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_7.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_8.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_9.jpg",
  "https://supermomos-app-resources-us.s3.amazonaws.com/Images/SocialBanner/banner_10.jpg",
];

export default function ModalAddBanner({
  renderTrigger,
  value,
  onSubmit,
  control,
}: IModalAddBannerProps) {
  const {
    fieldState: { error },
  } = useController({
    control,
    name: "banner",
  });
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>();

  const onOpen = () => {
    setOpen(true);
    setSelected(value);
  };

  const onClose = () => setOpen(false);

  const handleSubmit = () => {
    onSubmit(selected);
    onClose();
  };

  const handleChange = (image: string) => () => {
    setSelected(image);
  };

  return (
    <>
      {renderTrigger({ onClick: onOpen, error })}
      <Modal show={open} dismissible onClose={onClose} position="center" size={"5xl"}>
        <Modal.Header>Choose a banner</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="cols-span-1 h-[180px] relative">
                <VibrantImage src={image} width={300} height={220} alt="" />
                <div className="absolute bottom-0 right-0 p-2">
                  <input
                    type="checkbox"
                    className="w-6 h-6 cursor-pointer"
                    checked={selected === image}
                    onChange={handleChange(image)}
                  />
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button
            onClick={onClose}
            className="!bg-transparent !text-slate-600 mr-8"
          >
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-primary-200 hover:bg-primary-400 !text-primary-400 hover:!text-white min-w-[100px]"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
