import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, TextField, Button, Alert, CircularProgress,
  Stepper, Step, StepLabel, Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Reuse your existing styled components or create new ones
const RegisterWrapper = styled(Box)({
  minHeight: '100vh',
  backgroundColor: '#04091a',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
});

const RegisterCard = styled(Paper)({
  width: '100%',
  maxWidth: '480px',
  backgroundColor: '#0b1628',
  borderRadius: '20px',
  border: '1px solid rgba(15,184,166,0.13)',
  padding: '32px',
});

export default function AdminRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
     password: '', 
    otp: '',
  });

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    setError(null);
  };

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/register-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
  email: formData.email,
  password: formData.password  // ← Send password to backend
}),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to send code');
      
      setSuccess('Verification code sent! Check your email.');
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP & Register
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/register-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          fullName: formData.fullName,
        }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      
      setSuccess('✅ Admin account created! Redirecting...');
      
      // Wait 2 seconds then redirect to login
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Account created! Please sign in with your new admin credentials.' 
          } 
        });
      }, 2000);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterWrapper>
      <RegisterCard elevation={0}>
        <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1, textAlign: 'center' }}>
          Register as Admin
        </Typography>
        <Typography sx={{ color: '#4a6080', mb: 3, textAlign: 'center' }}>
          Create a new admin account for Smart Clinic
        </Typography>

        <Stepper activeStep={step - 1} sx={{ mb: 4 }}>
          <Step><StepLabel>Request Code</StepLabel></Step>
          <Step><StepLabel>Verify & Register</StepLabel></Step>
        </Stepper>

        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>
        )}

        {/* Step 1: Email Input */}
        {step === 1 && (
          <form onSubmit={handleRequestOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              label="Work Email *"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              required
              disabled={loading}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#0f1e36',
                  borderRadius: '10px',
                  color: '#dde6f0',
                },
                '& .MuiInputLabel-root': { color: '#3a5070' },
              }}
            />
            <TextField
              label="Full Name *"
              value={formData.fullName}
              onChange={handleChange('fullName')}
              required
              disabled={loading}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#0f1e36',
                  borderRadius: '10px',
                  color: '#dde6f0',
                },
              }}
            />
            <StyledTextField
  label="Password *"
  type="password"
  value={formData.password}
  onChange={handleChange('password')}
  required
  disabled={loading}
  fullWidth
  sx={{
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#0f1e36',
      borderRadius: '10px',
      color: '#dde6f0',
    },
  }}
  helperText="Min 8 characters"
/>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                background: 'linear-gradient(to right, #0fb8a6, #0d9488)',
                color: 'white',
                fontWeight: 700,
                py: 1.5,
                '&:hover': { background: 'linear-gradient(to right, #0d9488, #0b7a72)' },
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Send Verification Code'}
            </Button>
            <Button
              variant="text"
              onClick={() => navigate('/login')}
              sx={{ color: '#4a6080', mt: 1 }}
            >
              ← Back to Login
            </Button>
          </form>
        )}

        {/* Step 2: OTP Input */}
        {step === 2 && (
          <form onSubmit={handleVerifyAndRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Typography sx={{ color: '#dde6f0', mb: 1 }}>
              Enter the 6-digit code sent to <strong>{formData.email}</strong>
            </Typography>
            
            <TextField
              label="Verification Code *"
              value={formData.otp}
              onChange={handleChange('otp')}
              required
              disabled={loading}
              inputProps={{ maxLength: 6, pattern: '[0-9]*', inputMode: 'numeric' }}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#0f1e36',
                  borderRadius: '10px',
                  color: '#dde6f0',
                  textAlign: 'center',
                  fontSize: '24px',
                  letterSpacing: '8px',
                },
              }}
            />
            
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                background: 'linear-gradient(to right, #0fb8a6, #0d9488)',
                color: 'white',
                fontWeight: 700,
                py: 1.5,
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Verify & Create Account'}
            </Button>
            
            <Button
              variant="text"
              onClick={() => {
                setStep(1);
                setFormData(prev => ({ ...prev, otp: '' }));
                setError(null);
              }}
              sx={{ color: '#4a6080' }}
            >
              ← Use different email
            </Button>
          </form>
        )}
      </RegisterCard>
    </RegisterWrapper>
  );
}