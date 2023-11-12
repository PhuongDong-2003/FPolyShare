import { Box, Button, Divider, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import LoginIcon from '@mui/icons-material/Login';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const initCredential = {
  username: '',
  password: ''
}

const LoginPage = () => {
  const theme = useTheme();
  const matchDown = useMediaQuery(theme.breakpoints.down('md'));

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });

  const [credential, setCredential] = useState(initCredential);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      sx={{ 
        position: 'relative',
        minHeight: '100vh',
        background: `linear-gradient(-30deg, #CDCDCD, #D6F9F5)`
      }}
    >
      <Box
        component={'div'}
        sx={{
          width: { xs: '75vw', md: 475 },
          padding: 5,
          backgroundColor: 'white',
          borderRadius: 2,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Grid container direction={'column'}>
          <Grid item>
            <Box
              sx={{ padding: 3 }}
              textAlign={'center'}
            >
              <Typography variant={ matchDown ? 'h6' : 'h4' } component={'h4'}>
                Đăng nhập để tiếp tục
              </Typography>
              <Typography variant={ matchDown ? 'body1' : 'body2' } component={'p'}>
                Nhập tài khoản và mật khẩu của bạn để đăng nhập
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Form onSubmit={handleSubmit((data) => console.log(data))} control={control}>
              <Stack direction={'column'} spacing={3}>
                <Box>
                  <FormControl fullWidth error={Boolean(errors.username)} sx={{ fontStyle: 'italic' }}>
                    <InputLabel htmlFor="outlined-username">Username</InputLabel>
                    <OutlinedInput
                      id="outlined-username"
                      label="Password"
                      value={credential.username}
                      { ...register('username', {
                        required: {
                          value: true,
                          message: 'username không được bỏ trống'
                        }
                      }) }
                      onChange={(event) => setCredential({ ...credential, username: event.target.value})}
                    />
                    { errors.username && ( <FormHelperText>{errors.username.message}</FormHelperText> ) }
                  </FormControl>
                </Box>

                <Box>
                  <FormControl fullWidth error={Boolean(errors.password)} sx={{ fontStyle: 'italic' }}>
                    <InputLabel htmlFor="outlined-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-password"
                      label="Password"
                      value={credential.password}
                      type={showPassword ? 'text' : 'password'}
                      { ...register('password', {
                        required: {
                          value: true,
                          message: 'password không được bỏ trống'
                        }
                      }) }
                      onChange={(event) => setCredential({ ...credential, password: event.target.value})}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    { errors.password && ( <FormHelperText>{errors.password.message}</FormHelperText> ) }
                  </FormControl>
                </Box>

                <Box>
                  <Typography variant='body1' component={'a'} color='purple'>Quên mật khẩu?</Typography>
                </Box>
              </Stack>

              <Button type='submit' variant='contained' color='primary' fullWidth sx={{ my: 3 }}>
                <IconButton size='small'>
                  <LoginIcon />
                </IconButton>
                <Typography variant='body2' component={'span'}>sign in</Typography>
              </Button>
            </Form>
          </Grid>
          <Divider variant='fullWidth'/>
          <Grid item>
            <Button variant='contained' color='inherit' fullWidth sx={{ my: 3 }}>
              <IconButton size='small'>
                <GoogleIcon />
              </IconButton>
              <Typography variant='body2' component={'span'}>continue with Google</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default LoginPage