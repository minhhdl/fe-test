import { ReactNode } from "react";

interface ISocialInfoItemProps {
  icon: string;
  iconClassName?: string;
  content: ReactNode;
  className?: string;
}

export default function SocialInfoItem({
  icon,
  iconClassName,
  content,
  className,
}: ISocialInfoItemProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {icon && <i className={`sicon-${icon} mr-2 ${iconClassName}`} />}
      {content}
    </div>
  );
}
