import Header from './Header';
import Footer from './Footer';
// import './RootHome.css'

function RootHome(){

    return(
        <>
        <Header/>
            <div className="root-home">
                <h1>Welcome to myTeen&I</h1>
                <p>Being a parent is hard, but you don't have to do it on your own. Here at myTeen&I, we understand the complexities of parenting adolescents and provide a space for parents to connect, share experiences, and find valuable resources to help them thrive. Whether you're seeking advice, sharing your own journey, or simply looking for solidarity, you'll find a welcoming community of like-minded parents ready to support you every step of the way. Join us and discover the power of community in navigating the rewarding adventure of parenthood.</p>
            </div>
        <Footer />

        </>
        
    )
}

export default RootHome;