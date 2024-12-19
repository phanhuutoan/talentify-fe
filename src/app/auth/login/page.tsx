import { useState } from 'react'
import { Box, Container, Heading, Text, Label, Button,Input, VStack, SimpleGrid, Image, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@chakra-ui/react'
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Đăng nhập</CardTitle>
          <CardDescription className="text-center">Nhập thông tin đăng nhập của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="example@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    required 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
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
        </CardContent>
        <CardFooter className="flex justify-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">Quên mật khẩu?</a>
        </CardFooter>
      </Card>
    </div>
  )
}

