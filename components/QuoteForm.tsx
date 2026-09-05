export default function QuoteForm() {
  return (
    <div className="quote-form">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input type="text" className="form-input" placeholder="Your name" />
        </div>
        <div className="form-group">
          <label className="form-label">Phone</label>
          <input type="tel" className="form-input" placeholder="+91 00000 00000" />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Email Address</label>
        <input type="email" className="form-input" placeholder="you@email.com" />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Project Type</label>
          <select className="form-select" defaultValue="">
            <option value="">Select type</option>
            <option>Interior Design</option>
            <option>Exterior Design</option>
            <option>Construction</option>
            <option>Full Project</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Budget Range</label>
          <select className="form-select" defaultValue="">
            <option value="">Select range</option>
            <option>Under ₹25 Lakhs</option>
            <option>₹25 – ₹75 Lakhs</option>
            <option>₹75 Lakhs – ₹2 Crore</option>
            <option>₹2 Crore+</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Project Details</label>
        <textarea
          className="form-textarea"
          style={{ height: 150 }}
          placeholder="Describe your space, timeline, and any specific requirements…"
        />
      </div>
      <div className="form-submit-wrap">
        <button className="btn btn-dark" style={{ padding: "18px 56px", fontSize: ".78rem" }}>
          Request Quote
        </button>
        <p className="quote-note">We respond to all enquiries within one business day.</p>
      </div>
    </div>
  );
}
