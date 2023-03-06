import classNames from "classnames";
import Image from "next/image";
import AppLayout from "@/components/AppLayout/AppLayout";
import styles from "@/styles/Home.module.scss";
import { SocialData } from "@/types/Social";
import dayjs from "dayjs";
import { getSocialDetail } from "@/services/social";
import SocialInfoItem from "@/components/SocialInfoItem/SocialInfoItem";
import { NumericFormat } from "react-number-format";

export const getServerSideProps = async () => {
  const result = getSocialDetail();

  return {
    props: {
      social: result,
    },
  };
};

export default function Detail({ social }: { social: SocialData }) {
  return (
    <AppLayout title={social.title}>
      <main>
        <div className="container min-h-screen mx-auto py-24">
          <div className="relative">
            <section className={classNames("p-4 md:p-8", styles.form)}>
              <div className={styles.mainFields}>
                <h1 className="mb-6">
                  <span className="bg-primary-400 text-white text-5xl font-bold leading-normal px-3 py-1 border-none outline-none shadow-none">
                    {social.title}
                  </span>
                </h1>
                <div className="w-full max-w-[489px]">
                  <div className="grid grid-cols-12 gap-8 mb-6">
                    <div className="col-span-6">
                      <SocialInfoItem
                        icon="calendar"
                        iconClassName="text-5xl"
                        className="text-2xl"
                        content={dayjs(social.startAt).format("MMMM DD, ddd")}
                      />
                    </div>
                    <div className="col-span-6">
                      <SocialInfoItem
                        icon="clock"
                        iconClassName="text-5xl"
                        className="text-2xl"
                        content={dayjs(social.startAt).format("hh:mm A")}
                      />
                    </div>
                  </div>
                  <div className="col-span-6">
                    <SocialInfoItem
                      icon="location-marker"
                      iconClassName="text-2xl"
                      className="font-medium"
                      content={social.venue}
                    />
                  </div>
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-5">
                      <SocialInfoItem
                        icon="user-group"
                        iconClassName="text-2xl"
                        className="font-medium"
                        content={`${social.capacity} people`}
                      />
                    </div>
                    <div className="col-span-5">
                      <SocialInfoItem
                        icon="currency-dollar"
                        iconClassName="text-2xl"
                        className="font-medium"
                        content={
                          <NumericFormat
                            displayType="text"
                            value={social.price}
                            prefix="$"
                            thousandSeparator=","
                          />
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="whitespace-pre-line">{social.description}</div>
            </section>
            <div className={styles.banner}>
              <Image
                className="absolute w-full h-full z-0"
                src={social.banner}
                width={739}
                height={445}
                alt="preview"
              />
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
