# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.5](https://github.com/Pulse-Market/beta/compare/v0.1.4...v0.1.5) (2021-04-08)


### Features

* Add liquidity viewing ([1026fb4](https://github.com/Pulse-Market/beta/commit/1026fb43f1a336b81a3183734cfb5e437871c40e))


### Bug Fixes

* **tokenSwapper:** Fix issue where disabled input was not visible in darkmode ([fd44bc1](https://github.com/Pulse-Market/beta/commit/fd44bc12d21ba5798d6de50563db879047a2b148))

### [0.1.4](https://github.com/Pulse-Market/beta/compare/v0.1.3...v0.1.4) (2021-04-06)


### Features

* **menu:** Remove the wNEAR amount ([a9f50df](https://github.com/Pulse-Market/beta/commit/a9f50df483a956c1b58711dfe8fa104035aa2f3d))

### [0.1.3](https://github.com/Pulse-Market/beta/compare/v0.1.2...v0.1.3) (2021-04-06)


### Features

* Add DAI icon ([f0d8cf1](https://github.com/Pulse-Market/beta/commit/f0d8cf1050aa861633d65a9e99d7a52c4aaf0937))
* Add support for getting tokens when the person doesn't have any tokens ([131419e](https://github.com/Pulse-Market/beta/commit/131419e98c4f58cabaf73afbd0dfbb0d62990f8b))
* Add transactions overview to profile page ([030e05d](https://github.com/Pulse-Market/beta/commit/030e05d2976e7ecff256cdb9e450df25b240c931))
* New pulse theme ([1021e76](https://github.com/Pulse-Market/beta/commit/1021e765ddd9b78ba4f1f696a41eaf82daf4a8c7))
* Updated SDK & near-api-js to the latest versions ([524b867](https://github.com/Pulse-Market/beta/commit/524b867a7f506ba2185f15964980b12ef29369b3))
* **profile:** Add participated markets overview ([4a4caad](https://github.com/Pulse-Market/beta/commit/4a4caadfe53e462e11339d7e18620f90e4a6c427))
* **profile:** Remove unactive escrows ([3b8a168](https://github.com/Pulse-Market/beta/commit/3b8a1686105867d579ade12ad98b0184ee887c8d))
* **transactionsOverview:** Add support for infinite scrolling ([79ab9fa](https://github.com/Pulse-Market/beta/commit/79ab9fa55240b9b670f9940174579a66d556b593))


### Bug Fixes

* **math:** Fix maths.... ([13a3f55](https://github.com/Pulse-Market/beta/commit/13a3f55ed5b98e073fff64ea8a509261e84a5f99))
* Fix issue where valid escrow would show up as invalid ([7181fb8](https://github.com/Pulse-Market/beta/commit/7181fb8266f69ec3c6435c32c61d3e120c27d389))
* **userBalance:** Fix issue where balances could crash due an issue with pool tokens ([e3b9916](https://github.com/Pulse-Market/beta/commit/e3b9916e4bd9b7d36a1f10a6896a7eacdb129474))
* Fix issue where default fee was not formatted ([1d51e84](https://github.com/Pulse-Market/beta/commit/1d51e842d1688125fc4d7eccc4c6521a9cad8ec7))
* Fix issue where social was hardcoded ([593851f](https://github.com/Pulse-Market/beta/commit/593851f83f94e1007dd5fdea2e3677c7b17f7571))

### [0.1.2](https://github.com/fluxprotocol/flux-app-amm/compare/v0.1.1...v0.1.2) (2021-03-11)


### Features

* **positions:** Sort balances based on profit ([8f00d19](https://github.com/fluxprotocol/flux-app-amm/commit/8f00d19bf9cf68c31e7907ff7fd3f72067748737))
* **scalar:** Pretty format all the scalar values with , ([389a179](https://github.com/fluxprotocol/flux-app-amm/commit/389a1797ee3cda3a3aba6f6f6b7086c985cbfe8d))


### Bug Fixes

* **market:** Fix issue where login button was showing when data was not loaded yet ([4675b03](https://github.com/fluxprotocol/flux-app-amm/commit/4675b03c190914ec80e5df804288a1f73864cec6))
* **market:** Fix issue where pool tokens would not load ([0121c1a](https://github.com/fluxprotocol/flux-app-amm/commit/0121c1a433e435ec72ec8248cd7245b1f2380011))
* **menu:** Fix issue where login button was not showing while account was still loading ([c997332](https://github.com/fluxprotocol/flux-app-amm/commit/c99733263f1149cf4698b837e25589a2a1d0b550))
* **priceChart:** Fix issue where price chart wasn't showing up ([b63d05f](https://github.com/fluxprotocol/flux-app-amm/commit/b63d05fd6b4a087c4dd0183c00c176ce926c5417))
* **profile:** Fix issue where market description would push out the other cells ([1007274](https://github.com/fluxprotocol/flux-app-amm/commit/1007274a100c14b5ca4b49fa8383af2b4481395e))
* **scalar:** Fix issue where setting an initial value would not match after market creation ([68946b2](https://github.com/fluxprotocol/flux-app-amm/commit/68946b23c1f7efcd7e0af421ae3eb1f758bb4c7f))
* **userBalance:** Fix issue where div by 0 errors would occur ([15f7677](https://github.com/fluxprotocol/flux-app-amm/commit/15f76771651c99fb4d9c688478e79a31837f109b))
* Fix issue where clicking on cancel button would redirect you back to the wallet ([e0d2c11](https://github.com/fluxprotocol/flux-app-amm/commit/e0d2c11c766b944afea19918ee9005be83af1eda))
* Fix issue where Disqus was trying to insert itself on the home page ([f015580](https://github.com/fluxprotocol/flux-app-amm/commit/f0155800f35d61a96780548115eb9d81500a5009))

### 0.1.1 (2021-03-08)


### Features

* **account:** Remove zero balances and already claimed markets ([e77ff5e](https://github.com/fluxprotocol/flux-app-amm/commit/e77ff5eda98063bbaa2f7dd1abff828d72dea518))
* **app:** Disable features for non whitelisted users ([5ae99ae](https://github.com/fluxprotocol/flux-app-amm/commit/5ae99ae4c355252e8f96c4af68fe4eda0c4cfca2))
* **button:** Made outlined standard part of button ([86bd2fd](https://github.com/fluxprotocol/flux-app-amm/commit/86bd2fd463a51203416aa0091e7511aee33ae1ae))
* **claimable:** Add claimable amount ([8b3f9bf](https://github.com/fluxprotocol/flux-app-amm/commit/8b3f9bf2cba89bf056b5ee6764376769e5e011db))
* **collateralToken:** Fetch whitelist from the SDK ([a5bd431](https://github.com/fluxprotocol/flux-app-amm/commit/a5bd431536e3771a17690582732d267ee332e765))
* **darkmode:** Add a button for toggling between darmode and lightmode ([2f773b1](https://github.com/fluxprotocol/flux-app-amm/commit/2f773b168445b2fa15d66464b3098acaac027566))
* **darkmode:** Add darkmode support for the linechart and Disqus ([2f36315](https://github.com/fluxprotocol/flux-app-amm/commit/2f36315cc31db9cb9a729fe5f42349442e886858))
* **datepicker:** Use 24 hour clock by default ([4119d2a](https://github.com/fluxprotocol/flux-app-amm/commit/4119d2a6acdd6afe1b88c7ee383550d9dae1b563))
* **disclaimer:** Added disclaimer popup ([0905953](https://github.com/fluxprotocol/flux-app-amm/commit/09059534cdaffb80eb4ed38389184efe84d887ac))
* **fees:** Made market description align to the left ([958cf9f](https://github.com/fluxprotocol/flux-app-amm/commit/958cf9f66fdbc0e921623e67be3460a2237883cd))
* **home:** Added pending and unified overview under 1 component ([5c15d5e](https://github.com/fluxprotocol/flux-app-amm/commit/5c15d5e7182c257f1ce20fe30b084af82b8d912c))
* **market:** Add label to let the user know that all time is in UTC ([704e7e7](https://github.com/fluxprotocol/flux-app-amm/commit/704e7e79c9c748882486a67271082deb964f76d0))
* **market:** Add prices after trade and new estimate for scalar markets ([bf07f8f](https://github.com/fluxprotocol/flux-app-amm/commit/bf07f8febb34fe82b38f9f361c68059888ee557f))
* **market:** Add support for remembering your selected token when coming back ([c6b94eb](https://github.com/fluxprotocol/flux-app-amm/commit/c6b94ebc74b7d70fa2fc60abe026a96e7b1c63e9))
* **market:** Added start date ([0205fc6](https://github.com/fluxprotocol/flux-app-amm/commit/0205fc6b6a29126865650c6fbebdc9928bdb0ca7))
* **market:** Show all tabs for desktop ([213aab7](https://github.com/fluxprotocol/flux-app-amm/commit/213aab79ee927aa16ee5789f71f4788bc76b6708))
* **marketCreation:** Added ability to select which collateral token you want to use ([7b48a34](https://github.com/fluxprotocol/flux-app-amm/commit/7b48a3479d274d85b3ea38256d398899ee7b7dd5))
* **marketCreation:** Added validation ([5a3f072](https://github.com/fluxprotocol/flux-app-amm/commit/5a3f0727bfada03a7f1ae0fd18b0e1d8aec48aa5))
* **marketHeader:** Add formatting of volume and made percentage have maximum of 2 decimals ([01ee3e2](https://github.com/fluxprotocol/flux-app-amm/commit/01ee3e2530bc41cfa7e6a64149aae3d259f6bc82))
* **marketHeader:** Only go back to the previous page when the user actively came from the overview or balances ([2098fa1](https://github.com/fluxprotocol/flux-app-amm/commit/2098fa15f287f0363f679905961c8cb4e4ba15c4))
* **marketHeader:** Only go back to the previous page when the user actively came from the overview or balances ([335af4a](https://github.com/fluxprotocol/flux-app-amm/commit/335af4adc50dc4a6a34d7a4c0dd3fa89341c3091))
* **marketOpinion:** Add collateral token type to total volume ([dc4540f](https://github.com/fluxprotocol/flux-app-amm/commit/dc4540f159dd464b7abe7dc485e296f7bb25bf7a))
* **menu:** Add account icon ([db375b9](https://github.com/fluxprotocol/flux-app-amm/commit/db375b905946170298f93ad77dbce692fc92989d))
* **menu:** Added ability to swap NEAR for wNEAR ([597021f](https://github.com/fluxprotocol/flux-app-amm/commit/597021ff3914bd042b87855303512b782755b7f3))
* **menu:** Implemented better UI for menu ([e5a0168](https://github.com/fluxprotocol/flux-app-amm/commit/e5a01681380d7300ade2e942d4813519c659303c))
* **menu:** Made logo bigger ([a004ebe](https://github.com/fluxprotocol/flux-app-amm/commit/a004ebea8d26b0d77cdb9ebf65b7ba2829903c43))
* **priceHistory:** Metric "ALL" is now based on the creation date/resolution date instead of giving the standard "week". ([b166402](https://github.com/fluxprotocol/flux-app-amm/commit/b1664024372fef386fd8cd2ab37e4f14798b86da))
* **profile:** Remove claimed balances ([e7cf02b](https://github.com/fluxprotocol/flux-app-amm/commit/e7cf02b4fe08177135d3fa8e6d429b8efd27f81a))
* Removed remembering of selected period ([07763c5](https://github.com/fluxprotocol/flux-app-amm/commit/07763c58b4a3bfcc59e7b0d61586063cba26882d))
* **account:** Add fees overview ([01818ab](https://github.com/fluxprotocol/flux-app-amm/commit/01818ab6bb1b5b7cba89302e440839317526464d))
* **account:** Add user balances ([d83ab49](https://github.com/fluxprotocol/flux-app-amm/commit/d83ab4910100a74fb743423f7e328b99b5b5de40))
* **analytics:** Add Google Analytics ([41a601a](https://github.com/fluxprotocol/flux-app-amm/commit/41a601ac4ccc7136f6c34c251c4e35ac569057bc))
* **auth:** Add guards for non logged in users ([a86d222](https://github.com/fluxprotocol/flux-app-amm/commit/a86d222740fc5c29bf546067ca8d1f7be93cf5e0))
* **category:** Add beer category icon ([211a6de](https://github.com/fluxprotocol/flux-app-amm/commit/211a6de6ca07ce3dc73ccf86ef2e464d1b107967))
* **claims:** Only allow claims when you have a balance ([cc9902a](https://github.com/fluxprotocol/flux-app-amm/commit/cc9902af0a22345f2e12585c29b38c7ac60afa71))
* **colors:** Replaced green with army green ([ed9e74d](https://github.com/fluxprotocol/flux-app-amm/commit/ed9e74daa179d1aadceb4c6a55b551077aa54493))
* **connectors:** Add skeleton loaders ([62ef519](https://github.com/fluxprotocol/flux-app-amm/commit/62ef5194722dfeb38dcb617c2f93e85016eb0703))
* **contracts:** Add low storage cost and multiply where needed ([8058ee8](https://github.com/fluxprotocol/flux-app-amm/commit/8058ee8b4a2c80de30faf0f82636f6f8e34a3f63))
* **earnings:** Added disabled button when you already claimed your earnings ([92bf73e](https://github.com/fluxprotocol/flux-app-amm/commit/92bf73e36cf7b665e85918d5241ebe51ba0c38e5))
* **exitPool:** Add ability to use all balances as input ([d75e9ca](https://github.com/fluxprotocol/flux-app-amm/commit/d75e9cab74c9a2518e0340257f45cf7406e98121))
* **icons:** Add all types of icons ([422ad64](https://github.com/fluxprotocol/flux-app-amm/commit/422ad64c5777f6decdf215b05c12c5260171f570))
* **icons:** Add beer icons ([7e90c3c](https://github.com/fluxprotocol/flux-app-amm/commit/7e90c3cfc4f4e5cdb6c5b0f43780f51650fe1820))
* **joinPool:** Add ability to use all balances as input ([8ba0a84](https://github.com/fluxprotocol/flux-app-amm/commit/8ba0a841ebbfba53b5635fc8496576d1cc5982f7))
* **liquidity:** add small text and fixed tabbed view length ([9de62f3](https://github.com/fluxprotocol/flux-app-amm/commit/9de62f3efd4505a6433d83d516b1a6b5978135d2))
* **liquidity:** Made liquidity providing work ([1d22956](https://github.com/fluxprotocol/flux-app-amm/commit/1d2295607d5bf9c53a7a97696e67aa59fd8569e9))
* **liquidityProvider:** Add form validation ([3681ed2](https://github.com/fluxprotocol/flux-app-amm/commit/3681ed279119cf78f05dccaca531b0c34ab4b28a))
* **logos:** Replaced old logos with new ones ([7a8892b](https://github.com/fluxprotocol/flux-app-amm/commit/7a8892b0924f853d06685021fa7845cb504551ac))
* **market:** Add ability to exit pool ([42f086a](https://github.com/fluxprotocol/flux-app-amm/commit/42f086ae7b11c1959390ce9d6de19d08b06537a4))
* **market:** Add message when the market is closed ([c25b9ae](https://github.com/fluxprotocol/flux-app-amm/commit/c25b9ae8f504075c66fc357183f50b572f98d6cb))
* **market:** Add support for real data from GraphQL ([648c361](https://github.com/fluxprotocol/flux-app-amm/commit/648c361acd93544ad548538b47db25445f5f7894))
* **market:** added ability to claim earnings ([7e7a7dc](https://github.com/fluxprotocol/flux-app-amm/commit/7e7a7dc0b21cfa9f45672f3148ad9349e4a33bb7))
* **market:** Added categories from API ([b08ca7c](https://github.com/fluxprotocol/flux-app-amm/commit/b08ca7c06c7ae44e20bb8cec06d0465f28264a2d))
* **market:** Added correct odds ([8271699](https://github.com/fluxprotocol/flux-app-amm/commit/82716994e1c12c19c82c98990a3762ef977c74b4))
* **market:** Added volume value ([d094b47](https://github.com/fluxprotocol/flux-app-amm/commit/d094b47ca67b25e5bdc1e4e065915028e1cfd4b1))
* **market-overview:** add inifinite scroller ([5b1274f](https://github.com/fluxprotocol/flux-app-amm/commit/5b1274f8faa48c940c09496601e75d2e545bbbe8))
* **marketCreation:** Add ability to provide extra info for market resolution ([a5fd3ac](https://github.com/fluxprotocol/flux-app-amm/commit/a5fd3ac8fc3dc3c25b81f47b628d40401694af19))
* **marketPriceHistory:** Add filtering for days, weeks, months ([60f42c5](https://github.com/fluxprotocol/flux-app-amm/commit/60f42c52c3cdfa184b8692cc69871a3c36ba3bf4))
* **marketPricingHistory:** Add live-ish pricing data by polling the graph ([48c3fc0](https://github.com/fluxprotocol/flux-app-amm/commit/48c3fc0d0b7bc7d8aa108b87d4085889dba28cec))
* **menu:** Made profile menu more visible ([30d6221](https://github.com/fluxprotocol/flux-app-amm/commit/30d62212b91a4bc97835934fe0f82ffc2bb8e9a1))
* **menu:** Show the amount of wNEAR you have ([c0ee80a](https://github.com/fluxprotocol/flux-app-amm/commit/c0ee80a763c23464df39c628f4ab15807ddb0aa8))
* **metadata:** Add twitter and open graph metatags ([016453c](https://github.com/fluxprotocol/flux-app-amm/commit/016453cc354357ca2ca1d77bf79b0e252c61edcb))
* **pools:** Add support for weights with seeding ([11d3210](https://github.com/fluxprotocol/flux-app-amm/commit/11d321062891384788c08f74998c8806e4d3eca0))
* **priceHistory:** Metric "ALL" is now based on the creation date/resolution date instead of giving the standard "week". ([bc3fdec](https://github.com/fluxprotocol/flux-app-amm/commit/bc3fdecf420a7566f01f1d9d60499ffed3cd28f0))
* **profile:** Add spent and made it mobile friendly ([462c442](https://github.com/fluxprotocol/flux-app-amm/commit/462c442414f4ab8a33540770ffb65602914de1ef))
* **profile:** Add user balances to the overview ([501ca6e](https://github.com/fluxprotocol/flux-app-amm/commit/501ca6e2596abe813d8e746af9c1028a5441888b))
* **profile:** Made items in page more wide ([8ce8bde](https://github.com/fluxprotocol/flux-app-amm/commit/8ce8bdeede1164ce550647bf2a7010867c68ac3b))
* **profile:** Re-enable footer ([ce4ad09](https://github.com/fluxprotocol/flux-app-amm/commit/ce4ad092889ffc892d7adb2978dd5f80764dde06))
* **protocol:** Change UI according to new protocol interface ([25b3a90](https://github.com/fluxprotocol/flux-app-amm/commit/25b3a9024918ac8fd56a0c9da5514248a7db58f6))
* **redeem:** Allow swapping all shares with collateral when you got some of each ([86721dc](https://github.com/fluxprotocol/flux-app-amm/commit/86721dcc38dc95723f0571950effaeb495f017fa))
* **scalarMarkets:** Add new opinion card to show the current estimate of the scalar market ([561befb](https://github.com/fluxprotocol/flux-app-amm/commit/561befb629bef9061f06bbb0f7bfd085c8615f77))
* **scalarMarkets:** Add price chart tailored for scalar markets ([a6697b1](https://github.com/fluxprotocol/flux-app-amm/commit/a6697b16cad24ffaeb34287f9eec3a408059c651))
* **sdk:** Add ability to switch networks ([465d71d](https://github.com/fluxprotocol/flux-app-amm/commit/465d71dae83887c5934be9cf0791cd8236ffd6f2))
* **seed:** Add validation of forms ([afaca3c](https://github.com/fluxprotocol/flux-app-amm/commit/afaca3c93a2dfefc65ec2b1a2e81f31b6a51968e))
* **seedPool:** Add ability to use all balances as input ([53354c4](https://github.com/fluxprotocol/flux-app-amm/commit/53354c4904d49fe82db31faef54814ce2fcd5f7c))
* **seedPool:** Add placeholder ([2da4e38](https://github.com/fluxprotocol/flux-app-amm/commit/2da4e38bbf02fc1a885889e1cc07ae0cb2b76ade))
* **stats:** Remember period ([451801a](https://github.com/fluxprotocol/flux-app-amm/commit/451801a736a1bce8238b78eb7b677719c8d3b651))
* **swap:** Add ability to use all balance as input ([d42f9c7](https://github.com/fluxprotocol/flux-app-amm/commit/d42f9c7b1361866d0847b1af6c357c27e83cceec))
* **swap:** Add form errors for not enough balance ([b06955a](https://github.com/fluxprotocol/flux-app-amm/commit/b06955a421e019aaa71834ea23a48e06392cc4bf))
* **swap:** Reload token balances every 5sec ([ef805e7](https://github.com/fluxprotocol/flux-app-amm/commit/ef805e7e673eed128d49aa906d8345aee80a6b92))
* **theme:** Added lightmode ([b01d266](https://github.com/fluxprotocol/flux-app-amm/commit/b01d26650c6ab7bc009612f537c0f1615fa63c59))
* **token:** Add colors that matches the outcome ([cebdfcc](https://github.com/fluxprotocol/flux-app-amm/commit/cebdfcc39fc02daec2c02fc7bda10afe1d4d2ab3))
* **token:** Fetch decimals amount from token metadata ([c089fb4](https://github.com/fluxprotocol/flux-app-amm/commit/c089fb4ac0ac2f713ce0b44bf82b9fe61d3a0ba9))
* **tokenContract:** Removed storage requirements for buy & add_liquidity ([af76c73](https://github.com/fluxprotocol/flux-app-amm/commit/af76c73fd7c70266944cbd2ae06820d39b856852))
* **tokens:** Include tokens in market instead of in the redux store ([c8ed173](https://github.com/fluxprotocol/flux-app-amm/commit/c8ed173be8130a2226c95fc595a66e5ef50a06cd))
* **tokenSelect:** always show balance of a specific token ([3fb9559](https://github.com/fluxprotocol/flux-app-amm/commit/3fb9559094d7db77c3a1e52b98a8cc599548b093))
* **wNear:** Allow user to exit out of the storage deposit ([069cc80](https://github.com/fluxprotocol/flux-app-amm/commit/069cc802262f48ef6fd5db87ba06e9d911d4f26b))
* **wNear:** Allow user to exit out of the storage deposit ([bb494f2](https://github.com/fluxprotocol/flux-app-amm/commit/bb494f2de6c9817ba9257efc4403d64336618132))
* **wrappedNear:** Allow for registration of account ([02fd917](https://github.com/fluxprotocol/flux-app-amm/commit/02fd917046039a7abeeb0f741339d2409466c280))
* **wrappedNear:** Show card to wrap NEAR if the user has no balance ([0753634](https://github.com/fluxprotocol/flux-app-amm/commit/075363483359afef3e93617cf6c551de2a87b904))


### Bug Fixes

* Fix issue where chart was updating too much, causing the hover card to disappear. ([24fb181](https://github.com/fluxprotocol/flux-app-amm/commit/24fb181abde840361eb407e6ef079bd646be739c))
* **amm:** Fix issue where amm was not usable with 2FA ([066780b](https://github.com/fluxprotocol/flux-app-amm/commit/066780b162893e0c2bfd7adc92a9dee23ce1a9b0))
* **big:** Fix issue where numbers where rounded which causes the transaction to fail ([eca7678](https://github.com/fluxprotocol/flux-app-amm/commit/eca76782a54c70b485bac9ddcadd77b121c7a049))
* **calcShares:** Fix issue where it was using a fixed 18 denomination ([432737d](https://github.com/fluxprotocol/flux-app-amm/commit/432737d6cf1d0e7465a1593035c79773b2ffbf6e))
* **claim:** Fix issue where full tokenname was displayed instead of using the symbol ([1ec7ee3](https://github.com/fluxprotocol/flux-app-amm/commit/1ec7ee39e1d0486576c2009cd3ec46e77c48f795))
* **collateralToken:** Fix issue where fetching data from localnet on testnet would crash the page ([c182c0b](https://github.com/fluxprotocol/flux-app-amm/commit/c182c0b315985d75ffb16a07f949cd74ca1679dd))
* **collateralToken:** Fix issue where token image was not showing ([98034a7](https://github.com/fluxprotocol/flux-app-amm/commit/98034a7202cf8e3cbb2a7013435892fb60f43a47))
* **darkmode:** Fix issue where preferred scheme could make the toggle not work anymore ([3748d57](https://github.com/fluxprotocol/flux-app-amm/commit/3748d57c98e6c4247581ddff1e4dcc28a4bee3b9))
* **decimals:** remove more places where 18 is hardcoded ([957a488](https://github.com/fluxprotocol/flux-app-amm/commit/957a488059a491d91a7bc83d3ea666d9aa6239b9))
* **disqus:** Fix issue where comments where coming from different networks/protocol accounts ([b1d3913](https://github.com/fluxprotocol/flux-app-amm/commit/b1d39134d0f32037d005b0030fcd9dc21bb5001b))
* **disqus:** Fix issue where same comments where being used across the site ([f1f23e7](https://github.com/fluxprotocol/flux-app-amm/commit/f1f23e790a0a46225b2d7edd0061740ad794a157))
* **disqus:** Fix issue where title was not always showing ([e24c0a3](https://github.com/fluxprotocol/flux-app-amm/commit/e24c0a3f0d11def2b6392d41159f08a3aa390ddb))
* **env:** Fix issue where background could not be found ([1498a4a](https://github.com/fluxprotocol/flux-app-amm/commit/1498a4ab9cb7ac154fc21327a3358e9536ba5903))
* **ga:** Fix issue where pageview where not coming through ([9ac5aad](https://github.com/fluxprotocol/flux-app-amm/commit/9ac5aad44e1ba570a6e46daf18f1df6231310693))
* **intervals:** Fix issue where chart was jumping up and down ([12cb683](https://github.com/fluxprotocol/flux-app-amm/commit/12cb6835d58b5d4e0b62cb3ecf7724029a876023))
* **linechart:** Fix issue where same data was being displayed twice ([9b88e15](https://github.com/fluxprotocol/flux-app-amm/commit/9b88e1545d45b395da75bb44d446c8ab3fb7bf76))
* **liquidity:** Fix issue where liquidity denominations where always 18 ([15f09c4](https://github.com/fluxprotocol/flux-app-amm/commit/15f09c4d7dec2e4527efb51174aa090772ef7c1c))
* **liquidityProvider:** Fix issue where name was resolved as POO ([30e60e8](https://github.com/fluxprotocol/flux-app-amm/commit/30e60e8a281dc02c34ad174b9fe9cd252813e409))
* **market:** Fix issue where market could still be traded on even though the market ended ([78bac38](https://github.com/fluxprotocol/flux-app-amm/commit/78bac3866851fda2a371922dd8ea282eefd16e9c))
* **market:** Fix issue where market would because of a token implementation error ([f186386](https://github.com/fluxprotocol/flux-app-amm/commit/f18638639565ceb344d6189d820a0f20b318e380))
* **market:** Fix issue where old token data was still loaded for a different market ([80e219c](https://github.com/fluxprotocol/flux-app-amm/commit/80e219cbc3a53b0acc7b7a52956f58a273e88f49))
* **market:** Fix issue where same pool token was being shown for different markets ([77a06b3](https://github.com/fluxprotocol/flux-app-amm/commit/77a06b39db699b2bd76e66ca642852fcb733dded))
* **market:** Fix issue where user could still swap on markets with 0 liquidity ([ab237b7](https://github.com/fluxprotocol/flux-app-amm/commit/ab237b783fdb540f2a37d5ba5ec33fc731bcacd5))
* **market:** Fixed issue where exit pool was visible in a resoluted market ([4d80c9a](https://github.com/fluxprotocol/flux-app-amm/commit/4d80c9abc68112fe6baa1d1b85e50a2bcfd3ded4))
* **markets:** Fix issue where expired/finalized markets are showing in the overview ([3184ab8](https://github.com/fluxprotocol/flux-app-amm/commit/3184ab8ea18bb3d884e10b179c0dd46799e76610))
* **markets:** Fix issue where finalised markets where showing up in the trade tab ([8ad0ca4](https://github.com/fluxprotocol/flux-app-amm/commit/8ad0ca40fdf3535670c8cdbc5e3e1cc449a2b746))
* **markets:** Fix issue where volume was formatted wrong ([9e2b328](https://github.com/fluxprotocol/flux-app-amm/commit/9e2b328bdde9ebb686c0164ebfe984f11f0895b3))
* **marketsOverview:** Fix issue where finalized markets where showing up in pending ([725dbff](https://github.com/fluxprotocol/flux-app-amm/commit/725dbff5b7cc7a383d82204b06cd689f3e041a54))
* **marketsOverview:** Fix issue where overview did not render correctly when there was only 1 market ([8f536c9](https://github.com/fluxprotocol/flux-app-amm/commit/8f536c9a9f3a73019ec755a4a299cc3f7c6b5641))
* **overview:** Fix issue where bounds where showing instead of token name ([c20656d](https://github.com/fluxprotocol/flux-app-amm/commit/c20656d4028f5f7f33f28a8268cc351c443ad843))
* **positions:** Fix issue where short/long outcomes where shown as bounds ([57f6529](https://github.com/fluxprotocol/flux-app-amm/commit/57f65293c9859b67824a8e8c5a954c787e002f1b))
* **seedPool:** Fix issue where comma separated values where annoying to use ([c439b41](https://github.com/fluxprotocol/flux-app-amm/commit/c439b413da54955ccc219294dd3d19212197295c))
* **swap:** Fix issue where if you clicked buy it would sell ([46cbf9f](https://github.com/fluxprotocol/flux-app-amm/commit/46cbf9ff0ee7d99d470b38044ac59d23cd728c72))
* **swap:** Fix issue where negative inputs would still show data ([946bccc](https://github.com/fluxprotocol/flux-app-amm/commit/946bccc7eb8704df3b0ad7160dec8d597c592400))
* **swap:** Fix issue where numbers where to large to display ([b3d1355](https://github.com/fluxprotocol/flux-app-amm/commit/b3d1355ef460a858a3a9d47d179afa3b60876a9c))
* **swap:** Fix issue where token was mentioned twice ([e4c39a5](https://github.com/fluxprotocol/flux-app-amm/commit/e4c39a53062ebf17f6bc626c61e28993ce9f8ec5))
* **swapOverview:** Fees paid are in collateral token not in dollar ([e10389b](https://github.com/fluxprotocol/flux-app-amm/commit/e10389b70839ee05fb6b1fcd8e26d9adb1af47bd))
* **swapper:** fix issue where swapping with big numbers would crash the app ([707128a](https://github.com/fluxprotocol/flux-app-amm/commit/707128a45085ec502f3b7e80b965f87819d2f758))
* **tabbedViews:** Fix issue where you could click/see other forms ([64154a0](https://github.com/fluxprotocol/flux-app-amm/commit/64154a01378f0f58b1a7960d8d0d6e544df5019b))
* **tag:** Fix issue where hovering would change color of active button ([9673840](https://github.com/fluxprotocol/flux-app-amm/commit/9673840181a6844e11d5a768ca6876fe1dc9a9f4))
* **token:** Allow inputs to be max width ([ce19f4d](https://github.com/fluxprotocol/flux-app-amm/commit/ce19f4db6d632287322f339fe3e6233a5e885318))
* **token:** Fix issue where denominators where wrong ([7e878f6](https://github.com/fluxprotocol/flux-app-amm/commit/7e878f6663ccc4f7acfc742550d2d65675c923cf))
* **token-pair:** Fix issue where token image would become oval ([dd30415](https://github.com/fluxprotocol/flux-app-amm/commit/dd304158cc93b930687c88e17600930152f8cb73))
* **tokens:** Fix issue where tokens where denominated by 18 not by the collateral token ([7a74fd4](https://github.com/fluxprotocol/flux-app-amm/commit/7a74fd471a0fbd878600babeae64f5e1aec69115))
* **tokenSelect:** Fix issue where firefox was displaying the inputs weird ([50ee3e9](https://github.com/fluxprotocol/flux-app-amm/commit/50ee3e9e57ac50b2af7e8a6ba4f7006d6e0aece2))
* **tokenSelect:** fix issue where firefox was wrongly aligning the placeholder ([e7eb860](https://github.com/fluxprotocol/flux-app-amm/commit/e7eb860454cab651e98b24c069d5a7881b4280b3))
* **tokenSwapper:** Fix issue where inputs where not displaying the correct tokens ([44b88cf](https://github.com/fluxprotocol/flux-app-amm/commit/44b88cffdd9e7b0138c44f0c3e08609aeeb10f70))
* **wNear:** Fix issue where near wrapped near would crash when the user was logged out ([d5e701d](https://github.com/fluxprotocol/flux-app-amm/commit/d5e701d9fbdb867f8e6486848467e6573c9ce546))
* **wNear:** Fix issue where you could not correctly set numbers behind the comma ([42c17d4](https://github.com/fluxprotocol/flux-app-amm/commit/42c17d461d60c5b9f8f6086bb84ac7f207baa662))
* **wrapNear:** Fix issue where safari based browsers could not place comma's ([95173a3](https://github.com/fluxprotocol/flux-app-amm/commit/95173a32b97b6f85306c015c803387d2ec316cac))
