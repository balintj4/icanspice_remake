import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureIconProps {
  icon: LucideIcon;
  label: string;
  iconBgColor?: string;
}

export const FeatureIcon = ({ icon: Icon, label, iconBgColor = "bg-primary" }: FeatureIconProps) => {
  return (
    <div className="flex flex-col gap-2 items-center text-md max-w-[150px] text-center">
      <span className={cn("inline-flex p-6 rounded-full", iconBgColor)}>
        <Icon className="text-white w-8 h-8" />
      </span>
      <p className="text-sidebar-accent-foreground">{label}</p>
    </div>
  );
};