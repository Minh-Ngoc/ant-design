import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  LineChart,
  BarChart,
  Bar,
  Legend, 
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  RadialBarChart, 
  RadialBar,
  ReferenceLine,
} from 'recharts';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import Wrapper from '@/components/Wrapper';

const cx = classNames.bind(styles);

const Home = () => {
  const [lineData, setLineData] = useState([])
  const [barData, setBarData] = useState([])
  const [radialData, setRadialData] = useState([])

  const lineChartData = [
    {
        time: '12:00',
        pv: 58,
    },
    {
        time: '1:00',
        pv: 40,
    },
    {
        time: '2:00',
        pv: 68,
    },
    {
        time: '3:00',
        pv: 8,
    },
    {
        time: '4:00',
        pv: 64,
    },
    {
        time: '5:00',
        pv: 74,
    },
    {
        time: '6:00',
        pv: 50,
    },
    {
        time: '7:00',
        pv: 62,
    },
    {
        time: '8:00',
        pv: 74,
    },
    {
        time: '9:00',
        pv: 50,
    },
    {
        time: '10:00',
        pv: 10,
    },
    {
        time: '11:00',
        pv: 40,
    },
  ];
  
  const barChartData = [
    {
      name: '06 March',
      uv: 3500,
    },
    {
      name: '07 March',
      uv: -3000,
    },
    {
      name: '08 March',
      uv: -2000,
    },
    {
      name: '09 March',
      uv: 2780,
    },
    {
      name: '10 March',
      uv: -1890,
    },
    {
      name: '11 March',
      uv: 2390,
    },
    {
      name: '12 March',
      uv: 3490,
    },
  ];
  const radialChartData = [
    { name:'Bank', x: 75, fill:"#F3BA2F" },
    { name:'Token', x: 56, fill:" #54C2C1" },
    { name:'Cash', x: 40, fill:"#000000" },
    { name:'Stock', x: 25, fill:"#9020E9" },
  ];

  useEffect(() => {
    setLineData(lineChartData);
    setBarData(barChartData.map(item => 
      Object.assign(item, { fill: item.uv > 0 ? '#4FB5C9' : '#F05D5E' })
    ));
    setRadialData(radialChartData);
  }, [])
  const HiddenDot = () => (
    <circle cx={0} cy={0} r={0} fill="transparent" stroke="none" />
  );
  const style = {
    position: 'inherit',
    width: 'max-content',
    height: 'max-content',
    top: '10px',
    left: '40px',
  };

  const ContentLegend = (values, entry) =>  (
    <>
      <span className={cx('title')}> {values}: </span>
      <span className={cx('value')}> ${entry.payload.x} </span>
    </>
  )

  return (
   <main>
      <Head>
        <title>Home page</title>
      </Head>
      <Wrapper className={cx('chart')}>
        <h1>Token Price</h1>
        <div className={cx('line__chart')}>
          <LineChart
            width={800}
            height={400}
            data={lineData}
          >
            <CartesianGrid strokeWidth={1} vertical={false} stroke="#DEDEE7" />
            <XAxis axisLine={false} dataKey="time" tick={{ fill: "#A4A4B2" }} tickLine={false} />
            <YAxis axisLine={false} domain={[0, 80]} tick={{ fill: "#A4A4B2" }} tickLine={false} />
            <Tooltip />
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9747FF" />
                    <stop offset="100%" stopColor="#14F4C9" />
                </linearGradient>
            </defs>
            <Line
                type="monotone"
                dataKey="pv"
                stroke="url(#gradient)"
                strokeWidth={4}
                dot={<HiddenDot />}
            />
          </LineChart>
        </div >
      </Wrapper>

      <div className={cx('chart__group')}>
        <Wrapper className={cx('chart')}>
          <h1>Profit</h1>
          <div className={cx('line__chart')}>
            <BarChart
              width={500}
              height={500}
              data={barData}
              stackOffset="sign"
              syncMethod={(e) => console.log(e)}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="uv" radius={ [10, 10, 0, 0] } fill="#8884d8" stackId="stack" />
            </BarChart>
          </div >
        </Wrapper>

        <Wrapper className={cx('chart')}>
          <h1>Money Allocation</h1>
          <div className={cx('line__chart')}>
          <RadialBarChart
            width={400}
            height={300}
            cx={150}
            cy={150}
            innerRadius={20}
            outerRadius={140}
            barSize={10}
            data={radialData}
          >
            <RadialBar
              label={{ position: "insideStart", fill: "#fff" }}
              background
              dataKey="x"
            />
            <Legend
              iconSize={10}
              width={160}
              height={180}
              layout="vertical"
              verticalAlign="middle"
              wrapperStyle={style}
              formatter={ContentLegend}
            />
          </RadialBarChart>
          </div >
        </Wrapper>
      </div>
   </main>
  );
};

export default Home;
