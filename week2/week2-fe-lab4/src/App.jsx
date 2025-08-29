import React from 'react';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Article from './Article';

function App() {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div>
          <MainContent />
          <Article 
            title="What is a Component?" 
            content="Components are the foundation of React. They are self-contained pieces of code that render parts of the UI." 
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
