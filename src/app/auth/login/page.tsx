'use client'

import { useState } from 'react'
import { Button,Input, Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@chakra-ui/react'
// import { Field } from "@/_components/ui/field"
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Xử lý logic đăng nhập ở đây
    console.log('Login submitted')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card.Root className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Đăng nhập</CardTitle>
          <CardDescription className="text-center">Nhập thông tin đăng nhập của bạn</CardDescription>
        </CardHeader>
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Input id="email" type="email" placeholder="Email (ex: example@example.com)" required />
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    required 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size='sm'
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full mt-6">Đăng nhập</Button>
          </form>
        </Card.Body>
        <CardFooter className="flex justify-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">Quên mật khẩu?</a>
        </CardFooter>
      </Card.Root>
    </div>
  )
}

