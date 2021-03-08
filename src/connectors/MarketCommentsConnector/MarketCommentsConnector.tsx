import React, { useEffect } from 'react';

import { DiscussionEmbed } from 'disqus-react';
import { useSelector } from 'react-redux';
import { Reducers } from '../../redux/reducers';
import { NETWORK, NODE_ENV, PROTOCOL_ACCOUNT_ID } from '../../config';
import { useDarkmode } from '../../utils/darkmode';


export default function MarketCommentsConnector() {
    const market = useSelector((store: Reducers) => store.market.marketDetail);
    const isDarkmodeActive = useDarkmode();

    useEffect(() => {
        // @ts-ignore
        if (!window.DISQUS || !market) return;
        // @ts-ignore
        window.DISQUS.reset({
            reload: true,
        });
    }, [isDarkmodeActive]);

    if (!market) {
        return null;
    }

    return (
        <DiscussionEmbed
            shortname="flux-2"
            config={{
                title: market.description,
                identifier: NODE_ENV + NETWORK + PROTOCOL_ACCOUNT_ID + market.id + '_0',
                url: window.location.href,
            }}
        />
    );
}
