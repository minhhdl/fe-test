import { useCallback, useState } from "react";
import useSWRMutation from "swr/mutation";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Image from "next/image";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AppLayout from "@/components/AppLayout/AppLayout";
import FormInlineInput from "@/components/FormInlineInput/FormInlineInput";
import FormInput from "@/components/FormInput/FormInput";
import FormCheckbox from "@/components/FormCheckbox/FormCheckbox";
import FormRadio from "@/components/FormRadio/FormRadio";
import styles from "@/styles/Home.module.scss";
import FormTags from "@/components/FormTags/FormTags";
import FormDatepicker from "@/components/FormDatepicker/FormDatepicker";
import { IRenderTriggerArgs } from "@/components/ModalAddBanner/ModalAddBanner";
import { createSocial } from "@/services/social";
import { SocialData } from "@/types/Social";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { Alert, Spinner } from "flowbite-react";

const ModalAddBanner = dynamic(
  () => import("@/components/ModalAddBanner/ModalAddBanner"),
  { ssr: false }
);

interface IFormValues {
  title: string;
  banner: string;
  startDate: string;
  startTime: string;
  venue: string;
  capacity: string;
  price: string;
  description: string;
  isManualApprove: boolean;
  privacy: string;
  tags: string[];
}

const privacyOptions = [
  { label: "Public", value: "public", id: "public" },
  {
    label: "Curated Audience",
    value: "curated_audience",
    id: "curated_audience",
  },
  { label: "Community Only", value: "community_only", id: "community_only" },
];

const schema = yup.object({
  title: yup.string().required("Please enter title"),
  banner: yup.string().required("Please choose a banner"),
  startDate: yup.string().required("Please select start date"),
  startTime: yup.string().required("Please select start time"),
  venue: yup.string().required("Please enter venue"),
  capacity: yup.string().required("Please enter max capacity"),
  price: yup.string().required("Please enter cost per person"),
  description: yup.string().required("Please enter description"),
  isManualApprove: yup.boolean().nullable(),
  privacy: yup.string().required("Please select privacy"),
  tags: yup.array().min(1, "Please select at least 1 tag"),
});

export default function Home() {
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation("/api/social", createSocial);
  const [isError, setIsError] = useState<boolean>(false);

  const { control, setValue, watch, handleSubmit } = useForm<IFormValues>({
    defaultValues: {
      title: "Untitle Event",
      banner: "",
    },
    resolver: yupResolver(schema),
  });

  const banner = watch("banner");

  const onBannerSubmit = (image: string = "") => {
    setValue("banner", image, { shouldValidate: true });
  };

  const onSubmit = (values: IFormValues) => {
    setIsError(false);
    const data: SocialData = {
      title: values.title,
      banner: values.banner,
      startAt: dayjs(
        `${values.startDate} ${values.startTime}`,
        "YYYY-MM-DD HH:mm"
      ).toISOString(),
      venue: values.venue,
      capacity: +values.capacity,
      price: +values.price,
      description: values.description,
      privacy: values.privacy,
      isManualApprove: values.isManualApprove || false,
      tags: values.tags,
    };

    trigger(data, {
      onSuccess: () => {
        setIsError(false);
        router.push("/social");
      },
      onError: () => {
        setIsError(true);
      },
    });
  };

  const renderBannerTrigger = useCallback(
    ({ onClick, error }: IRenderTriggerArgs) => (
      <div className={styles.uploadLabel} onClick={onClick}>
        <span className="flex items-center text-darkBlue-400 text-xl font-semibold">
          <i className="sicon-picture text-2xl mr-4"></i>Add a banner
        </span>
        {error?.message && (
          <p className="mt-1 text-sm font-medium text-red-600">
            {error.message}
          </p>
        )}
      </div>
    ),
    []
  );

  return (
    <AppLayout title="Create social">
      <main>
        <div className="container min-h-screen mx-auto py-24">
          <div className="relative">
            <section className={classNames("p-4 md:p-8", styles.form)}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.mainFields}>
                  <FormInlineInput
                    name="title"
                    control={control}
                    defaultValue="Untitle Event"
                    className="mb-6"
                  />
                  <div className="w-full max-w-[489px]">
                    <div className="grid grid-cols-12 gap-8 mb-6">
                      <div className="col-span-6">
                        <FormDatepicker
                          name="startDate"
                          control={control}
                          leftIcon="calendar"
                          iconClassName="text-5xl !mt-0"
                          inputClassName="mt-1"
                        />
                      </div>
                      <div className="col-span-6">
                        <FormDatepicker
                          name="startTime"
                          control={control}
                          leftIcon="clock"
                          iconClassName="text-5xl !mt-0"
                          inputClassName="mt-1"
                          showTimeOnly
                        />
                      </div>
                    </div>
                    <FormInput
                      name="venue"
                      control={control}
                      leftIcon="location-marker"
                      className="mb-3"
                      placeholder="Venue"
                    />
                    <div className="grid grid-cols-12 gap-8">
                      <div className="col-span-5">
                        <FormInput
                          type="numeric"
                          name="capacity"
                          control={control}
                          leftIcon="user-group"
                          placeholder="Max capacity"
                        />
                      </div>
                      <div className="col-span-5">
                        <FormInput
                          type="numeric"
                          name="price"
                          control={control}
                          leftIcon="currency-dollar"
                          placeholder="Cost per person"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <FormInput
                  name="description"
                  type="textarea"
                  control={control}
                  className="mb-6"
                  inputClassName="min-h-[200px]"
                  label="Description"
                  placeholder="Description of your event..."
                />
                <div className="rounded-xl bg-white p-8">
                  <span className="inline-block bg-primary-200 text-primary-400 text-4xl font-bold px-3 leading-[60px] mb-8">
                    Settings
                  </span>
                  <FormCheckbox
                    control={control}
                    name="isManualApprove"
                    label="I want to approve attendees"
                    className="mb-4"
                  />
                  <FormRadio
                    control={control}
                    name="privacy"
                    label="Privacy"
                    options={privacyOptions}
                  />
                  <FormTags
                    control={control}
                    name="tags"
                    label="Tag your social"
                    helperText="Pick tags for our curation engine to work its magin"
                    tags={["Engineering", "Product", "Marketing", "Design"]}
                  />
                </div>
                <div className="mt-8">
                  {isError && (
                    <Alert color="failure" className="mb-8 font-medium">
                      An error occurred when creating your social. Please try
                      again later
                    </Alert>
                  )}
                  <button
                    disabled={isMutating}
                    className="w-full uppercase bg-primary-200 text-primary-400 py-3 rounded-lg font-medium"
                  >
                    {isMutating ? (
                      <>
                        <Spinner className="mr-3" />
                        Processing...
                      </>
                    ) : (
                      "Create social"
                    )}
                  </button>
                </div>
              </form>
            </section>
            <div className={styles.banner}>
              {banner && (
                <Image
                  className="absolute w-full h-full z-0"
                  src={banner}
                  width={739}
                  height={445}
                  alt="preview"
                />
              )}
              <ModalAddBanner
                control={control}
                value={banner}
                onSubmit={onBannerSubmit}
                renderTrigger={renderBannerTrigger}
              />
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
