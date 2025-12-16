import React from 'react';
import StreamImg from '@/theme2/assets/images/stream.svg';
import { SwitchComponent } from '../index';

import './index.scss';


interface LiveStreamSwitchProps {
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
}

export const LiveStreamSwitch: React.FC<LiveStreamSwitchProps> = ({ enabled, setEnabled }) => {
    return (
        <div className="flex items-center gap-2">
            <div className={`stream-icon ${enabled ? 'enabled' : 'disabled'}`} style={{ maskImage: `url(${StreamImg})` }} />
            <SwitchComponent enabled={enabled} setEnabled={setEnabled} />
        </div>
    )
}