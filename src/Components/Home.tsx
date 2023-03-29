import "./Styles.css";
import logo from "./Images/logo.svg";
import logo_white from "./Images/logo-white.svg";
import working from "./Images/illustration-working.svg";
import brand_recognition from "./Images/icon-brand-recognition.svg";
import detailed_records from "./Images/icon-detailed-records.svg";
import fully_customizable from "./Images/icon-fully-customizable.svg";
import logo_twitter from "./Images/icon-twitter.svg";
import logo_pinterest from "./Images/icon-pinterest.svg";
import logo_facebook from "./Images/icon-facebook.svg";
import logo_instagram from "./Images/icon-instagram.svg";
import { useEffect, useState } from "react";
import hamburger from "./Images/hamburger.png";

function Home() {

  const [url, setUrl] = useState<string>("");
  const [jsonData, setJsonData] = useState<any>();
  const [links, setLinks] = useState<any>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  
  async function formHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoaded(false);
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const data = await response.json();
    setJsonData(data);

    
    if (response.ok)  setLoaded(true);    
    
  }
  
  function copyHandler(url: string, index: number) {
    const arr = links;
    arr[index].isCopied = false;
    
    let data = [new ClipboardItem({"text/plain": new Blob([url], { type: "text/plain" })})];
    navigator.clipboard.write(data).then(() => {
      arr[index].isCopied = true;
      setLinks([...arr]);
    });

    setTimeout(() => {
      arr[index].isCopied = false;
      setLinks([...arr]);
    }, 4000);

  }
  
  useEffect(() => {
    if (loaded) {
      setLinks([...links, {website: url, link: jsonData.result.short_link2, isCopied: false}])
    }
  }, [jsonData]);
  
  return (
    <div className="container">
      <nav className="desktop">
        <div className="nav">
          <div>
            <img src={logo} alt="" />
            <a href="/">Features</a>
            <a href="/">Pricing</a>
            <a href="/">Resources</a>
          </div>
          <div>
            <a href="/">Login</a>
            <a href="/"><button>Sign Up</button></a>
          </div>
        </div>
      </nav>

      <nav className="mobile">
        <div className="nav">
          <img src={logo} alt="" />
          <img src={hamburger} alt="" className="hamburger" onClick={() => setMenu(!menu)} />
        </div>
        { menu && <div className="outer-nav-components">
          <div className="nav-components">
            <a href="/">Features</a>
            <a href="/">Pricing</a>
            <a href="/">Resources</a>
            <hr />
            <a href="/">login</a>
            <button>Sign Up</button>
          </div>
        </div>}
      </nav>

      <div className="first-component">
        <div className="inner-first-component">
          <div className="left">
            <div className="title">More than just shorter links</div>
            <div className="description">Build your brand's recognition and get detailed insights on how your links are performing.</div>
            <button style={{fontSize: 20}}>Get started</button>
          </div>
          <div className="right">
            <img src={working} alt="" />
          </div>
        </div>
      </div>

      <div className="outer-form">
        <form onSubmit={formHandler}>
          <input type="text" placeholder="Shorten a link here..." onChange={e => setUrl(e.target.value)} />
          <button type="submit" style={{fontSize: 20, borderRadius: 10}}>Shorten It!</button>
        </form>
      </div>

      <div className="second-component">
        <div className="inner-second-component">
          <div className="link-bar">
            {links.map((link: any, index: number) => <div key={index} className="copied-links">
              <a href={"//" + link.website} target="_blank" className="websites">{link.website}</a>
              <div>
                <a href={"//" + link.link} target="_blank" className="links">{link.link}</a>
                <button className={link.isCopied ? "copied" : ""} onClick={(e) => copyHandler(link.link, index)}>{link.isCopied ? "Copied" : "Copy"}</button>
              </div>
            </div>)}
          </div>
          <div className="top">
            <div className="header">Advanced Statistics</div>
            <div className="description">Track how your links are performing across the web with our advacned statistics dashboard.</div>
          </div>
          <div className="second">
            <div className="box">
              <img src={brand_recognition} alt="" />
              <div className="title">Brand Recognition</div>
              <div className="description">Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instill confidence in your content.</div>
            </div>
            <div className="box" style={{marginTop: 44}}>
              <img src={detailed_records} alt="" />
              <div className="title">Detailed Records</div>
              <div className="description">Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instill confidence in your content.</div>
            </div>
            <div className="box" style={{marginTop: 88}}>
              <img src={fully_customizable} alt="" />
              <div className="title">Fully Customizable</div>
              <div className="description">Boost your brand recognition with each click. Generic links don't mean a thing. Branded links help instill confidence in your content.</div>
            </div>
            <div className="line"></div>
          </div>
        </div>
      </div> 
      <div className="third-component">
        <div className="title">Boost your links today</div>
        <button style={{fontSize: 20}}>Get Started</button>
      </div>

      <footer>
        <div className="inner-footer">
          <img src={logo_white} alt="" />
          <div>
            <div>
              <div className="title">Features</div>
              <div className="description">Link Shortening</div>
              <div className="description">Branded Links</div>
              <div className="description">Analytics</div>
            </div>
            <div>
              <div className="title">Resources</div>
              <div className="description">Blog</div>
              <div className="description">Developers</div>
              <div className="description">Support</div>
            </div>
            <div>
              <div className="title">Company</div>
              <div className="description">About</div>
              <div className="description">Our Team</div>
              <div className="description">Careers</div>
              <div className="description">Contact</div>
            </div>
          </div>
          <span>
            <img src={logo_facebook} alt="" />
            <img src={logo_twitter} alt="" />
            <img src={logo_instagram} alt="" />
            <img src={logo_pinterest} alt="" />
          </span>
        </div>
      </footer>
    </div>
  )
}

export default Home;