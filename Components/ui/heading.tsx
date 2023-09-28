import { ApolloError } from "@apollo/client";

interface HeadingProps {
  title?: string;
  errrorTitle?: string;
  subtitle?: string;
  errorSubtitle?: string;
  center?: boolean;
  error?: ApolloError;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
  error,
  errrorTitle,
  errorSubtitle,
}) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold text-black font-gotham">
        {error ? errrorTitle : title}
      </div>
      <div className="font-light font-gotham text-neutral-500 mt-2  w-4/5">
        {error ? errorSubtitle : subtitle}
      </div>
    </div>
  );
};

export default Heading;
