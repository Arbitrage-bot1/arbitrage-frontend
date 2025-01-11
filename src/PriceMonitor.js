import React, { useEffect, useState } from 'react';
import axios from 'axios';
import soundFile from './sound.mp3';
import { getActiveElement } from '@testing-library/user-event/dist/utils';

const PriceMonitor = () => {
    const moment = require('moment');
    const [quickSwapPrice, setQuickSwapPrice] = useState(null);
    const [curvePrice, setCurvePrice] = useState(null);
    const [sushiPrice, setSushiPrice] = useState(null);
    const [fiWooPrice, setFiWooPrice] = useState(null);
    const [arbitrageMessage1, setArbitrageMessage1] = useState('');
    const [arbitrageMessage2, setArbitrageMessage2] = useState('');
    const [arbitrageMessage3, setArbitrageMessage3] = useState('');
    const [maxMatic, setMaxMatic] = useState(null);
    const [maxWeth, setMaxWeth] = useState(null);
    const [maxWbtc, setMaxWbtc] = useState(null);
    const [minMatic, setMinMatic] = useState(null);
    const [minWeth, setMinWeth] = useState(null);
    const [minWbtc, setMinWbtc] = useState(null);
    const [srcOne, setSrcOne] = useState("");
    const [srcTwo, setSrcTwo] = useState("");
    const [log, setLog] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [flag, setFlag] = useState("");
    const [downloadnumber, setDownloadNumber] = useState();
    const [number, setNumber] = useState(10);
    const [period, setPeriod] = useState(15);
    const [vnumber, setVnumber] = useState(10);
    const [vperiod, setVperiod] = useState(15);
    let logs = [];

    const getQuickSwapPrice = async () => {
        const response1 = await axios.get('https://api.paraswap.io/prices/?srcToken=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&destToken=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&network=137&partner=quickswapv3&includeDEXS=quickswap%2Cquickswapv3%2Cquickswapv3.1%2Cquickperps&srcDecimals=18&destDecimals=6&amount=1000000000000000000&side=SELL&maxImpact=15');
        const response2 = await axios.get('https://api.paraswap.io/prices/?srcToken=0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619&destToken=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&network=137&partner=quickswapv3&includeDEXS=quickswap%2Cquickswapv3%2Cquickswapv3.1%2Cquickperps&srcDecimals=18&destDecimals=6&amount=1000000000000000000&side=SELL&maxImpact=15');
        const response3 = await axios.get('https://api.paraswap.io/prices/?srcToken=0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6&destToken=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&network=137&partner=quickswapv3&includeDEXS=quickswap%2Cquickswapv3%2Cquickswapv3.1%2Cquickperps&srcDecimals=8&destDecimals=6&amount=100000000&side=SELL&maxImpact=15');
        // const response4 = await axios.get('https://api.paraswap.io/prices/?srcToken=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&destToken=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&network=137&partner=quickswapv3&includeDEXS=quickswap%2Cquickswapv3%2Cquickswapv3.1%2Cquickperps&srcDecimals=8&destDecimals=6&amount=1000000&side=SELL&maxImpact=15');
        return {
            MATIC: Number(response1.data.priceRoute.destAmount) / 1000000,
            WETH: Number(response2.data.priceRoute.destAmount) / 1000000,
            WBTC: Number(response3.data.priceRoute.destAmount) / 1000000,
        }
    };

    const getCurvePrice = async () => {
        const response = await axios.get('https://api.curve.fi/api/getPools/polygon/factory');
        const pools = response.data.data.poolData;
        const usdtMaticPool = pools.find(pool => pool.id.includes('factory-v2-123'));
        const wethWbtcPool = pools.find(pool => pool.id.includes('factory-v2-3'));
        const usdtPool = pools.find(pool => pool.id.includes('factory-v2-227'));
        console.log(usdtMaticPool.coins[0].usdPrice)
        console.log(usdtPool.coins[0].usdPrice)
        return {
            MATIC: usdtMaticPool.coins[0].usdPrice / usdtPool.coins[0].usdPrice,
            WETH: wethWbtcPool.coins[0].usdPrice / usdtPool.coins[0].usdPrice,
            WBTC: wethWbtcPool.coins[1].usdPrice / usdtPool.coins[0].usdPrice,
        }
    };

    const getSushiPrice = async () => {
        const response1 = await axios.get('https://api.sushi.com/swap/v5/137?referrer=sushi&tokenIn=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&tokenOut=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&amount=1000000000000000000&maxSlippage=0.005&gasPrice=8199622646&enableFee=true&feeReceiver=0xca226bd9c754F1283123d32B2a7cF62a722f8ADa&fee=0.0025&feeBy=output&includeTransaction=true&includeRoute=true');
        const response2 = await axios.get('https://api.sushi.com/swap/v5/137?referrer=sushi&tokenIn=0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619&tokenOut=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&amount=1000000000000000000&maxSlippage=0.005&gasPrice=11249089246&enableFee=true&feeReceiver=0xca226bd9c754F1283123d32B2a7cF62a722f8ADa&fee=0.0025&feeBy=output&includeTransaction=true&includeRoute=true');
        const response3 = await axios.get('https://api.sushi.com/swap/v5/137?referrer=sushi&tokenIn=0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6&tokenOut=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&amount=100000000&maxSlippage=0.005&gasPrice=9188559608&enableFee=true&feeReceiver=0xca226bd9c754F1283123d32B2a7cF62a722f8ADa&fee=0.0025&feeBy=output&includeTransaction=true&includeRoute=true');
        return {
            MATIC: Number(response1.data.assumedAmountOut) / 1000000,
            WETH: Number(response2.data.assumedAmountOut) / 1000000,
            WBTC: Number(response3.data.assumedAmountOut) / 1000000,
        }
    };

    const gethistorydata = async () => {
        let data = { number: number };

        try {
            const res = await axios.post("https://arbitrage-backend2.onrender.com/api/history/gethistory", data);
            setLog(res.data);
        } catch (error) {
            console.error("Error during GET request:", error);
        }


    }


    const getdata = async () => {
        let data = { period: period };

        try {

            await axios.post("https://arbitrage-backend2.onrender.com/api/saveData", data);

        } catch (error) {
            console.error("Error during GET request:", error);
        }

    }
    const getFiWooPrice = async () => {
        const response1 = await axios.get('https://api.woofi.com/v3/cross_chain_swap?src_network=polygon&dst_network=arbitrum&src_token=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&dst_token=0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9&src_amount=1000000000000000000&slippage=1&extra_fee_rate=0');
        const response2 = await axios.get('https://api.woofi.com/v3/cross_chain_swap?src_network=polygon&dst_network=arbitrum&src_token=0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619&dst_token=0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9&src_amount=1000000000000000000&slippage=1&extra_fee_rate=0');
        const response3 = await axios.get('https://api.woofi.com/v3/cross_chain_swap?src_network=polygon&dst_network=arbitrum&src_token=0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6&dst_token=0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9&src_amount=100000000&slippage=1&extra_fee_rate=0');
        return {
            MATIC: Number(response1.data.data.price),
            WETH: Number(response2.data.data.price),
            WBTC: Number(response3.data.data.price),
        }

    };

    const findArbitrageOpportunity = async () => {
        const quickPrice = await getQuickSwapPrice();
        // const curvePriceValue = await getCurvePrice();
        const sushiPriceValue = await getSushiPrice();
        // const fiWooPriceValue = await getFiWooPrice();

        setQuickSwapPrice(quickPrice);
        // setCurvePrice(curvePriceValue);
        setSushiPrice(sushiPriceValue);
        // setFiWooPrice(fiWooPriceValue);

        // setMaxMatic(Math.max(quickPrice.MATIC, curvePriceValue.MATIC, sushiPriceValue.MATIC, fiWooPriceValue.MATIC));
        // setMinMatic(Math.min(quickPrice.MATIC, curvePriceValue.MATIC, sushiPriceValue.MATIC, fiWooPriceValue.MATIC));
        // setMaxWeth(Math.max(quickPrice.WETH, curvePriceValue.WETH, sushiPriceValue.WETH, fiWooPriceValue.WETH));
        // setMinWeth(Math.min(quickPrice.WETH, curvePriceValue.WETH, sushiPriceValue.WETH, fiWooPriceValue.WETH));
        // setMaxWbtc(Math.max(quickPrice.WBTC, curvePriceValue.WBTC, sushiPriceValue.WBTC, fiWooPriceValue.WBTC));
        // setMinWbtc(Math.min(quickPrice.WBTC, curvePriceValue.WBTC, sushiPriceValue.WBTC, fiWooPriceValue.WBTC));

        setMaxMatic(Math.max(quickPrice.MATIC, sushiPriceValue.MATIC));
        setMinMatic(Math.min(quickPrice.MATIC, sushiPriceValue.MATIC));
        setMaxWeth(Math.max(quickPrice.WETH, sushiPriceValue.WETH));
        setMinWeth(Math.min(quickPrice.WETH, sushiPriceValue.WETH));
        setMaxWbtc(Math.max(quickPrice.WBTC, sushiPriceValue.WBTC));
        setMinWbtc(Math.min(quickPrice.WBTC, sushiPriceValue.WBTC));

        if (quickPrice.MATIC < sushiPriceValue.MATIC) {
            if ((Math.abs(sushiPriceValue.MATIC / quickPrice.MATIC - 1) * 100) > 0.8) {
                setArbitrageMessage1('Buy MATIC on QuickSwap, Sell on Sushiswap');
                setSrcOne("https://quickswap.exchange/#/swap?swapIndex=0&currency0=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&currency1=ETH&exactAmount=1");
                setSrcTwo(`https://www.sushi.com/polygon/swap?token0=NATIVE&token1=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&swapAmount=`);
                const audio = new Audio(soundFile);
                audio.play();
            } else {
                setArbitrageMessage1('No Arbitrage Opportunity');
                setSrcOne("");
                setSrcTwo("");
            }
        } else if (sushiPriceValue.MATIC < quickPrice.MATIC) {
            if ((Math.abs(quickPrice.MATIC / sushiPriceValue.MATIC - 1) * 100) > 0.8) {
                setArbitrageMessage1('Buy MATIC on Sushiswap, Sell on QuickSwap');
                setSrcOne(`https://www.sushi.com/polygon/swap?token0=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&token1=NATIVE&swapAmount=1`);
                setSrcTwo(`https://quickswap.exchange/#/swap?swapIndex=0&currency0=ETH&currency1=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&exactAmount=`);
                const audio = new Audio(soundFile);
                audio.play();
            } else {
                setArbitrageMessage1('No Arbitrage Opportunity');
                setSrcOne("");
                setSrcTwo("");
            }
        } else {
            setArbitrageMessage1('No Arbitrage Opportunity');
        }

        if (quickPrice.WETH < sushiPriceValue.WETH) {
            setArbitrageMessage2('Buy WETH on QuickSwap, Sell on Sushiswap');
        } else if (sushiPriceValue.WETH < quickPrice.WETH) {
            setArbitrageMessage2('Buy WETH on Sushiswap, Sell on QuickSwap');
        } else {
            setArbitrageMessage2('No Arbitrage Opportunity');
        }

        if (quickPrice.WBTC < sushiPriceValue.WBTC) {
            setArbitrageMessage3('Buy WBTC on QuickSwap, Sell on Sushiswap');
        } else if (sushiPriceValue.WBTC < quickPrice.WBTC) {
            setArbitrageMessage3('Buy WBTC on Sushiswap, Sell on QuickSwap');
        } else {
            setArbitrageMessage3('No Arbitrage Opportunity');
        }

    };


    // const savetoData = async () => {
    //     const quickPrice = await getQuickSwapPrice();
    //     const sushiPriceValue = await getSushiPrice();

    //     setQuickSwapPrice(quickPrice);
    //     setSushiPrice(sushiPriceValue);
    //     setMaxMatic(Math.max(quickPrice.MATIC, sushiPriceValue.MATIC));
    //     setMinMatic(Math.min(quickPrice.MATIC, sushiPriceValue.MATIC));
    //     setMaxWeth(Math.max(quickPrice.WETH, sushiPriceValue.WETH));
    //     setMinWeth(Math.min(quickPrice.WETH, sushiPriceValue.WETH));
    //     setMaxWbtc(Math.max(quickPrice.WBTC, sushiPriceValue.WBTC));
    //     setMinWbtc(Math.min(quickPrice.WBTC, sushiPriceValue.WBTC));

    //     if (quickPrice.MATIC == sushiPriceValue.MATIC) {

    //         let logEntry = {
    //             time: new Date(),
    //             profit_percentage: (quickPrice.MATIC / sushiPriceValue.MATIC - 1) * 100,
    //             WPOL1: 1 / quickPrice.MATIC,
    //             WPOL2: 1 / quickPrice.MATIC,
    //             USDT1: 1,
    //             USDT2: quickPrice.MATIC / sushiPriceValue.MATIC,
    //             exchange_from: "Sushi",
    //             exchange_to: "QuickSwap",
    //             flag: "Blue"
    //         };

    //         try {
    //             await axios.post('https://arbitrage-backend2.onrender.com/api/logs', logEntry);
    //             console.log('Log saved to database:', logEntry);
    //         } catch (error) {
    //             console.error('Error saving log:', error.message);
    //         }
    //     }

    //     else {
    //         saveData(quickPrice.MATIC, sushiPriceValue.MATIC)
    //     }
    // }


    // const saveData = async (quick, sushi) => {
    //     const quickPrice = await getQuickSwapPrice();
    //     const sushiPriceValue = await getSushiPrice();

    //     let logEntry = {
    //         time: new Date(),
    //         profit_percentage: (quick / sushi - 1) * 100,
    //         WPOL1: 1 / quick,
    //         WPOL2: 1 / quick,
    //         USDT1: 1,
    //         USDT2: quick / sushi,
    //         exchange_from: "Sushi",
    //         exchange_to: "QuickSwap",
    //         flag: (quick * 100 / sushi - 100) > 0 ? "Green" : "Red"
    //     };

    //     try {
    //         await axios.post('https://arbitrage-backend2.onrender.com/api/logs', logEntry);
    //         console.log('Log saved to database:', logEntry);
    //     } catch (error) {
    //         console.error('Error saving log:', error.message);
    //     }
    // }

    const changedata = () => {
        if (vperiod > 300 || vperiod < 10) {
            alert("please do input period from 10 to 300")
        }
        else if (vnumber > 1000 || vnumber < 1) {
            alert("please do input number from 1 to 1000")
        }
        else {
            setPeriod(vperiod);
            setNumber(vnumber);
            getdata();
        }
    }

    const handleDownload = async () => {
        let data = { downloadnumber: downloadnumber };

        try {
            const response = await axios.post("https://arbitrage-backend2.onrender.com/api/download-excel", data,{
                responseType: "blob"
            });

            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "logs.xlsx";  // File name for download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error downloading Excel file:", error.message);
        }
    };

    useEffect(() => {
        const gethistoryshow = setInterval(gethistorydata, 10000);

        return () => {
            clearInterval(gethistoryshow);
        };
    }, [number]);


    return (
        <div className='flex flex-col items-center justify-center w-full gap-12 p-12 body-main'>
            <img src='favicon.jpg' alt='' style={{ width: "150px", borderRadius: "20px" }} />

            <h1 className='font-bold text-3xl main-name'>Arbitrage Opportunity Logs</h1>
            <div className='download'>
                <input type="number" value={downloadnumber}
                    onChange={(e) => setDownloadNumber(Number(e.target.value))}></input>
                <button className='downloadbutton' onClick={handleDownload}>Download Excel</button>
            </div>
            <div className='showhistroydata'>
                <div className="scroll-container">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th className='headdate'>Date</th>
                                <th className='headexchangefrom'>Exchange From</th>
                                <th className='headcurrenyfromusdt'>Curreny From(USDT)</th>
                                <th className='headcurrenytowpol'>Curreny To(WPOL)</th>
                                <th className='headsecond'>Exchange To</th>
                                <th className='headsecond'>Curreny From(WPOL)</th>
                                <th className='headsecond'>Curreny To(USDT)</th>
                                <th className='headthird'>Per %</th>
                                <th className='headthird'>Flag</th>
                            </tr>
                        </thead>
                        <tbody>
                            {log.map((item, index) => {
                                // if (item.profit_percentage > 0.8) {
                                //     const audio = new Audio(soundFile);
                                //     audio.play();
                                // }
                                return (<tr>
                                    <td>{index + 1}</td>
                                    <td>{moment(item.time).format('YYYY-MM-DD HH:mm:ss')}</td>
                                    <td>{item.exchange_from}</td>
                                    <td className='usdtBackground'>{item.USDT1}</td>
                                    <td>{item.WPOL1.toFixed(5)}</td>
                                    <td>{item.exchange_to}</td>
                                    <td>{item.WPOL2.toFixed(5)}</td>
                                    <td className='usdtBackground'>{item.USDT2}</td>
                                    <td className={item.flag}>{item.profit_percentage}%</td>
                                    <td className={item.flag}>{item.flag}</td>
                                </tr>);
                            }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='getinfoshowing'>
                <div>
                    Data: <input type="number" className="opportunityperiod" placeholder="1~1000" value={vnumber}
                        onChange={(e) => setVnumber(Number(e.target.value))} min="1"
                        max="1000"
                        step="1" required />
                </div>
                <div>
                    Period: <input type="number" className='numbershowing' placeholder="5~60" value={vperiod}
                        onChange={(e) => { setVperiod(Number(e.target.value)) }} min="5"
                        max="60"
                        step="1" required />
                </div>
                <div className='applybut' onClick={() => { changedata(); }}>Apply</div>
            </div>
            {/* <h1 className='text-3xl font-bold textName'>Arbitrage Price Monitor</h1>
            <div style={{ display: "flex", flexDirection: "row", gap: "12px", alignItems: "center", justifyItems: "center", width: "100%", textAlign: "center" }}>
                <div style={{ width: "100%" }}>
                    <div className="getopportunity">
                        <div style={styles.priceContainer}>
                            <h2 className='font-bold text-2xl'>USDT/MATIC</h2>
                            {quickSwapPrice && sushiPrice && quickSwapPrice.MATIC < sushiPrice.MATIC ? (
                                <>
                                    <p><strong>QuickSwap Price:</strong> {quickSwapPrice ? `1 USDT = ${1 / quickSwapPrice.MATIC} MATIC` : 'Loading...'}</p>
                                    <p><strong>Sushiswap Price:</strong> {sushiPrice ? `${1 / quickSwapPrice.MATIC} MATIC = ${sushiPrice.MATIC / quickSwapPrice.MATIC} USDT` : 'Loading...'}</p>
                                    <p><strong>Price Diff:</strong> {sushiPrice && quickSwapPrice ? `$${Math.abs(sushiPrice.MATIC / quickSwapPrice.MATIC - 1)}` : 'Loading...'}</p>
                                    <p><strong>Estimated Profit Percentage:</strong> {sushiPrice && quickSwapPrice ? `${Math.abs(sushiPrice.MATIC / quickSwapPrice.MATIC - 1) * 100} %` : 'Loading...'}</p>
                                </>
                            ) : (
                                <>
                                    <p><strong>Sushiswap Price:</strong> {sushiPrice ? `1 USDT = ${1 / sushiPrice.MATIC} MATIC` : 'Loading...'}</p>
                                    <p><strong>QuickSwap Price:</strong> {quickSwapPrice ? `${1 / sushiPrice.MATIC} MATIC = ${quickSwapPrice.MATIC / sushiPrice.MATIC} USDT` : 'Loading...'}</p>
                                    <p><strong>Price Diff:</strong> {sushiPrice && quickSwapPrice ? `$${Math.abs(quickSwapPrice.MATIC / sushiPrice.MATIC - 1)}` : 'Loading...'}</p>
                                    <p><strong>Estimated Profit Percentage:</strong> {sushiPrice && quickSwapPrice ? `${Math.abs(quickSwapPrice.MATIC / sushiPrice.MATIC - 1) * 100} %` : 'Loading...'}</p>
                                </>
                            )
                            }
                        </div>
                    </div>
                    <div style={styles.messageContainer}>
                        <h2 className='font-bold text-2xl' style={{ paddingTop: "100px" }}>Arbitrage Opportunity</h2>
                        <p>{arbitrageMessage1}</p>
                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <div style={styles.priceContainer}>
                        <h2 className='font-bold text-2xl'>USDT/WETH</h2>
                        <p><strong>QuickSwap Price:</strong> {quickSwapPrice ? `1WETH = ${quickSwapPrice.WETH} USDT` : 'Loading...'}</p>
                        <p><strong>Sushiswap Price:</strong> {sushiPrice ? `1WETH = ${sushiPrice.WETH} USDT` : 'Loading...'}</p>
                        <p><strong>Sushiswap Price:</strong> {sushiPrice ? `1WETH = ${sushiPrice.WETH} USDT` : 'Loading...'}</p>
                        <p><strong>FiWooswap Price:</strong> {fiWooPrice ? `1WETH = ${fiWooPrice.WETH} USDT` : 'Loading...'}</p>
                        <p><strong>Price Diff:</strong> {sushiPrice && quickSwapPrice ? `$${Math.abs(maxWeth - minWeth)}` : 'Loading...'}</p>
                        <p><strong>Estimated Profit Percentage:</strong> {sushiPrice && quickSwapPrice ? `${Math.abs(maxWeth - minWeth) * 100 / minWeth} %` : 'Loading...'}</p>
                    </div>
                    <div style={styles.messageContainer}>
                        <h2>Arbitrage Opportunity</h2>
                        <p>{arbitrageMessage2}</p>
                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <div style={styles.priceContainer}>
                        <h2 className='font-bold text-2xl'>USDT/WBTC</h2>
                        <p><strong>QuickSwap Price:</strong> {quickSwapPrice ? `1WBTC = ${quickSwapPrice.WBTC} USDT` : 'Loading...'}</p>
                        <p><strong>Sushiswap Price:</strong> {sushiPrice ? `1WBTC = ${sushiPrice.WBTC} USDT` : 'Loading...'}</p>
                        <p><strong>Sushiswap Price:</strong> {sushiPrice ? `1WBTC = ${sushiPrice.WBTC} USDT` : 'Loading...'}</p>
                        <p><strong>FiWooswap Price:</strong> {fiWooPrice ? `1WBTC = ${fiWooPrice.WBTC} USDT` : 'Loading...'}</p>
                        <p><strong>Price Diff:</strong> {sushiPrice && quickSwapPrice ? `$${Math.abs(maxWbtc - minWbtc)}` : 'Loading...'}</p>
                        <p><strong>Estimated Profit Percentage:</strong> {sushiPrice && quickSwapPrice ? `${Math.abs(maxWbtc - minWbtc) * 100 / minWbtc} %` : 'Loading...'}</p>
                    </div>
                    <div style={styles.messageContainer}>
                        <h2>Arbitrage Opportunity</h2>
                        <p>{arbitrageMessage3}</p>
                    </div>
                </div>
            </div> */}

            <div className='flex flex-col md:flex-row items-center justify-between w-full gap-8'>
                <iframe
                    src={"https://www.sushi.com/polygon/swap?token0=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&token1=NATIVE&swapAmount=1"}
                    height="660px"
                    width="100%"
                    style={{
                        border: "0",
                        margin: "0 auto",
                        display: "block",
                        borderRadius: "10px",
                        maxWidth: "600px",
                        minWidth: "300px",
                    }}
                    id="myId"
                />
                <iframe
                    src={"https://quickswap.exchange/#/swap?swapIndex=0&currency0=ETH&currency1=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&exactAmount="}
                    height="660px"
                    width="100%"
                    style={{
                        border: "0",
                        margin: "0 auto",
                        display: "block",
                        borderRadius: "10px",
                        maxWidth: "600px",
                        minWidth: "300px",
                    }}
                    id="myId"
                />
            </div>
        </div>
    );
};

const styles = {

    red: {
        backgroundColor: 'red'
    },

    green: {
        backgroundColor: 'green'
    },

    container: {
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        margin: 'auto',
        paddingTop: "20px",
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    priceContainer: {
        marginBottom: '20px',
    },


    messageContainer: {
        fontWeight: 'bold',
        fontSize: '1.2em',
    },
};

export default PriceMonitor;

