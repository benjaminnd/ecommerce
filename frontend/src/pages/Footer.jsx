import React from 'react'
import URLProduction from '../helpers/URL'
import serverURL from '../helpers/URL';


function Footer() {
    return (
        <div className="footer">
        <div className="container-footer">
            <div className="row">
                <div className="footer-col-1">
                    <h3>Download our App</h3>
                    <p>Download App for Andriod and ios mobile phone.</p>
                    <div className="app-logo">
                        <img src={`${serverURL}/uploads/play-store.png`} alt=""/>
                        <img src={`${serverURL}/uploads/app-store.png`}  alt=""/>
                    </div>
                </div>
                <div className="footer-col-2">
                    <img src={`${serverURL}/uploads/bennystore.png`} alt=""/>
                    <p>Sustainability and Variety</p>
                </div>
                <div className="footer-col-3">
                    <h3>Useful Links</h3>
                    <ul>
                        <li>Coupons</li>
                        <li>Blog Post</li>
                        <li>Return Policy</li>
                        <li>Join Affiliate</li>
                    </ul>
                </div>
                <div className="footer-col-4">
                    <h3>Follow Us</h3>
                    <ul>
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>Instagram</li>
                        <li>Youtube</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className="copyright">Copyright &copy; 2020</p>
        </div>
    </div>
    )
}

export default Footer
