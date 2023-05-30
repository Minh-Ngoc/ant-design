import { Inter } from 'next/font/google'
import { Button, Space } from 'antd';

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main>
       <Space wrap>
        <Button type="primary" danger>
          Primary
        </Button>
        <Button danger>Default</Button>
        <Button type="dashed" danger>
          Dashed
        </Button>
        <Button type="text" danger>
          Text
        </Button>
        <Button type="link" danger>
          Link
        </Button>
      </Space>
    </main>
  )
}
