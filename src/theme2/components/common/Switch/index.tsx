
import { Switch } from '@headlessui/react';


interface SwitchComponentProps {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
    enabledBgColor?: string;
    disabledBgColor?: string;
    enabledBallColor?: string;
    disabledBallColor?: string;
}

export const SwitchComponent: React.FC<SwitchComponentProps> = ({
    enabled,
    setEnabled,
    enabledBallColor = '#0b1426c9',
    disabledBallColor = '#fff',
    enabledBgColor = '#6df6ff',
    disabledBgColor = '#a7b0c3e0',
}) => {
    return (
        <Switch 
            checked={enabled} 
            onChange={setEnabled} 
            className="relative inline-flex h-[20px] w-[38px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
            style={{
                backgroundColor: enabled ? enabledBgColor : disabledBgColor
            }}
        >
            <span 
                aria-hidden="true" 
                className="pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out"
                style={{
                    backgroundColor: enabled ? enabledBallColor : disabledBallColor,
                    transform: enabled ? 'translateX(18px)' : 'translateX(0)'
                }}
            />
        </Switch>
    );
};