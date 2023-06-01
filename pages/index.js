import React from 'react';
import {
  LineChart,
  BarChart,
  Bar,
  Legend, Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import classNames from 'classnames/bind';
import styles from './index.module.scss';
import Wrapper from '@/components/Wrapper';

const cx = classNames.bind(styles);

const Home = () => {
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
  const barchartData = [
    {
      date: '06 March',
      money: 1300
    },
    {
      date: '07 March',
      money: -1500
    },
    {
      date: '08 March',
      money: 2500
    },
    {
      date: '09 March',
      money: -500
    },
    {
      date: '10 March',
      money: -250
    },
    {
      date: '10 March',
      money: 250
    },
    {
      date: '10 March',
      money: 1200
    },
  ];
  const HiddenDot = () => (
    <circle cx={0} cy={0} r={0} fill="transparent" stroke="none" />
  );
  return (
   <main>
      <Wrapper className={cx('chart')}>
        <h1>Token Price</h1>
        <div className={cx('line__chart')}>
          <LineChart
            width={1400}
            height={400}
            data={lineChartData}
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
                strokeWidth={2}
                dot={<HiddenDot />}
            />
          </LineChart>
        </div >
      </Wrapper>

      <Wrapper className={cx('chart')}>
        <h1>Money Allocation</h1>
        <div className={cx('line__chart')}>
        <BarChart
          width={730}
          height={250}
          data={barchartData}
          margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Bar dataKey="date" fill="#8884d8" />
          <Bar dataKey="money" fill="#82ca9d" />
        </BarChart>
        </div >
      </Wrapper>
   </main>
  );
};

export default Home;