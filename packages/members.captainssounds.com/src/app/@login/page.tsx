'use client'

import { ReactElement } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import authConfig from '../../lib/auth/authConfig'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { Form, Formik } from 'formik'
import GoogleIcon from '@mui/icons-material/Google'
import { object, string } from 'yup'

const schema = object().shape({
  email: string().email().required(),
  password: string().required()
})

type Values = {
  email: string
  password: string
}

export default function Login(): ReactElement {
  const router = useRouter()
  async function handleGoogleAuth(): Promise<void> {
    const auth = getAuth(initializeApp(authConfig))
    const authProvider = new GoogleAuthProvider()

    authProvider.setCustomParameters({ prompt: 'select_account' })
    await signInWithPopup(auth, authProvider)
  }

  async function handleSubmit(values: Values): Promise<void> {
    try {
      const credential = await signInWithEmailAndPassword(
        getAuth(initializeApp(authConfig)),
        values.email,
        values.password
      )
      const idToken = await credential.user.getIdToken()

      await fetch('/api/login', {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      })

      router.push('/')
    } catch (e) {
      // setError((e as Error).message)
    }
  }

  return (
    <Box width="90vw" mt="80px" textAlign="center" mx="5vw" mb={10}>
      <Stack justifyContent="center" alignItems="center">
        <Card sx={{ maxWidth: '600px' }}>
          <CardHeader title="Login" />
          <CardContent>
            <Typography variant="body2">
              Please use the email of your purchase to access your products.
            </Typography>
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={schema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isValid,
                isSubmitting
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Stack direction="column" spacing={2}>
                    <TextField
                      label="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.email) && Boolean(touched.email)}
                      helperText={errors.email && touched.email && errors.email}
                    />
                    <TextField
                      label="password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        Boolean(errors.password) && Boolean(touched.password)
                      }
                      helperText={
                        errors.password && touched.password && errors.password
                      }
                    />

                    <Button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      variant="contained"
                    >
                      Login
                    </Button>
                    <div>or</div>
                    <Button
                      type="button"
                      onClick={handleGoogleAuth}
                      variant="contained"
                      startIcon={<GoogleIcon />}
                    >
                      Log in with Google
                    </Button>

                    <div className="links">
                      <Link href="/forgot-password">Forgot Password?</Link>
                      <div>
                        Don&lsquo;t have an account?
                        <Link href="/register">Sign Up</Link>
                      </div>
                    </div>
                  </Stack>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}
