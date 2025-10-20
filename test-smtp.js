require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🔍 Testing SMTP Connection...\n');

const config = {
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: String(process.env.EMAIL_SECURE || 'false') === 'true',
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASSWORD
};

console.log('📧 Configuration:');
console.log(`   Host: ${config.host}`);
console.log(`   Port: ${config.port}`);
console.log(`   Secure: ${config.secure}`);
console.log(`   User: ${config.user}`);
console.log(`   Password: ${config.pass ? '***' + config.pass.slice(-4) : 'NOT SET'}`);
console.log('');

if (!config.user || !config.pass) {
  console.error('❌ ERROR: EMAIL_USER or EMAIL_PASSWORD not set in .env file');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: config.host,
  port: config.port,
  secure: config.secure,
  auth: {
    user: config.user,
    pass: config.pass
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 30000,
  socketTimeout: 30000,
  greetingTimeout: 30000
});

console.log('⏳ Testing connection (may take 30 seconds)...\n');

transporter.verify()
  .then(() => {
    console.log('✅✅✅ SUCCESS! ✅✅✅');
    console.log('SMTP server is ready to send emails');
    console.log('');
    console.log('Your nodemailer configuration is correct!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌❌❌ CONNECTION FAILED ❌❌❌');
    console.error('');
    console.error('Error Code:', error.code);
    console.error('Error Message:', error.message);
    console.error('');
    
    // Diagnostics spécifiques par type d'erreur
    if (error.code === 'ETIMEDOUT') {
      console.error('💡 DIAGNOSTIC: Connection Timeout');
      console.error('');
      console.error('This usually means:');
      console.error('  1. The SMTP port is blocked by your hosting provider (Render.com, Heroku, etc.)');
      console.error('  2. Your firewall is blocking the connection');
      console.error('  3. The SMTP server is not reachable from your network');
      console.error('');
      console.error('🔧 SOLUTIONS:');
      console.error('  1. Try port 2525: EMAIL_PORT=2525');
      console.error('  2. Try port 465: EMAIL_PORT=465 and EMAIL_SECURE=true');
      console.error('  3. Use a different SMTP provider (Mailgun, SendGrid, Brevo)');
      console.error('  4. If on Render.com/Heroku: Use HTTP API instead of SMTP');
      console.error('');
      console.error('See SMTP_TROUBLESHOOTING.md for detailed solutions');
    } else if (error.code === 'EAUTH' || error.responseCode === 535) {
      console.error('💡 DIAGNOSTIC: Authentication Failed');
      console.error('');
      console.error('Your username or password is incorrect.');
      console.error('');
      console.error('🔧 SOLUTIONS:');
      console.error('  1. For Gmail: Use an "App Password", not your regular password');
      console.error('     Generate one here: https://myaccount.google.com/apppasswords');
      console.error('  2. Check that EMAIL_USER is your full email address');
      console.error('  3. Check that EMAIL_PASSWORD is correct (no spaces)');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('💡 DIAGNOSTIC: Connection Refused');
      console.error('');
      console.error('The SMTP server refused the connection.');
      console.error('');
      console.error('🔧 SOLUTIONS:');
      console.error('  1. Check that EMAIL_HOST is correct');
      console.error('  2. Try a different port (587, 465, or 2525)');
      console.error('  3. Check if the SMTP service is down');
    } else {
      console.error('💡 Unknown error. Check your configuration.');
    }
    
    process.exit(1);
  });

