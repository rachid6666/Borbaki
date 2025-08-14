import "./mailList.css"

const MailList = () => {
  return (
    <div class="mail-container">
        <h1 class="mail-title">Save time, save money!</h1>
      <span class="mail-desc">Sign up and we'll send the best deals to your inbox.</span>
      <form class="mail-form">
        <input type="email" class="mail-input" placeholder="Enter your email address">
          </input>
        <button type="submit" class="mail-button">Subscribe</button>
      </form>
</div>
  ) 
}

export default MailList