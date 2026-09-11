export default function SettingsView({ active }: { active: boolean }) {
  return (
    <div className={`content view${active ? " active" : ""}`}>
      <div className="page-head">
        <div>
          <div className="eyebrow">PROPERTY</div>
          <h1>Property Settings</h1>
          <p>JaffnaCityPMS · configuration &amp; system preferences</p>
        </div>
      </div>
      <div className="section-grid two-col">
        <article className="panel">
          <div className="panel-head"><div><h2>Property Details</h2></div></div>
          <div className="detail-grid" style={{ padding: "0 17px 17px" }}>
            <div><span>Property name</span><strong>JaffnaCityPMS</strong></div>
            <div><span>Category</span><strong>5-Star Luxury Hotel</strong></div>
            <div><span>Total rooms</span><strong>100</strong></div>
            <div><span>Currency</span><strong>LKR — Sri Lankan Rupee</strong></div>
            <div><span>Primary language</span><strong>English</strong></div>
            <div><span>Secondary language</span><strong>தமிழ் (Tamil)</strong></div>
            <div><span>Timezone</span><strong>Asia/Colombo (GMT+5:30)</strong></div>
            <div><span>Check-in / Check-out</span><strong>2:00 PM / 11:00 AM</strong></div>
          </div>
        </article>
        <article className="panel">
          <div className="panel-head"><div><h2>System Status</h2></div></div>
          <div className="status-strip vertical">
            <span className="status-ok"><i></i> PMS Core Engine</span>
            <span className="status-ok"><i></i> Channel Manager Sync</span>
            <span className="status-ok"><i></i> Payment Gateway (PayHere)</span>
            <span className="status-ok"><i></i> Email &amp; SMS Gateway</span>
            <span className="status-warn"><i></i> Expedia Rate Sync — degraded</span>
          </div>
        </article>
      </div>
    </div>
  );
}
