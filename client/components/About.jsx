import React from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";



const techStack = [
    {
        name: 'React',
        description: 'Front End Library',
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1150px-React-icon.svg.png",
    },
    {
        name: 'Bootstrap',
        description: 'CSS Library',
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/2560px-Bootstrap_logo.svg.png'
    },
    {
        name: 'Axios',
        description: 'HTTP Client',
        src: 'https://user-images.githubusercontent.com/8939680/57233882-20344080-6fe5-11e9-9086-d20a955bed59.png'
    },
    {
        name: 'Passport',
        description: 'Authentication',
        src: 'https://seeklogo.com/images/P/passport-logo-16D89B2F37-seeklogo.com.png'
    },
    {
        name: 'Bcrypt',
        description: 'Encryption',
        src: 'https://bcrypt.online/images/bcrypt-esse-tools-logo-square.svg'
    },
    {
        name: 'NodeJS',
        description: 'Runtime',
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/archive/d/d9/20160518085101%21Node.js_logo.svg/120px-Node.js_logo.svg.png'
    },
    {
        name: 'Express',
        description: 'Server',
        src: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png'
    },
    {
        name: 'MongoDB',
        description: 'DBMS',
        src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Antu_mongodb.svg/1024px-Antu_mongodb.svg.png'
    },
    {
        name: 'Mongoose',
        description: 'ORM',
        src: 'https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mongoose/mongoose.png'
    },
    {
        name: 'MongoDB Atlas',
        description: 'Database Hosting',
        src: 'https://store-images.s-microsoft.com/image/apps.32750.0ad9e17c-15dc-49db-9db4-d9f75b621712.05b08ef8-5d6a-4578-8b1a-71742e337150.0a45bbad-e141-44cf-a06c-fe28797ed8f4',
    },
    {
        name: 'ESLint',
        description: 'Linter',
        src: 'https://eslint.org/icon-512.png'
    },
    {
        name: 'Babel',
        description: 'Javascript Compiler',
        src: 'https://user-images.githubusercontent.com/3025322/87547253-bf050400-c6a2-11ea-950a-280311bc6cc8.png'
    },
    {
        name: 'Webpack',
        description: 'Module Bundler',
        src: 'https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-small.png'
    },
];

const mongeese = [
    {
        name: 'AJ Bell',
        github: 'https://github.com/abell10101',
        src: 'https://avatars.githubusercontent.com/u/111496135?v=4',
        favBreed: '',
    },
    {
        name: 'Evan Perry',
        github: 'https://github.com/evmaperry',
        src: 'https://avatars.githubusercontent.com/u/77681429?v=4',
        favBreed: 'Daschund',
    },
    {
        name: 'Geremy Fisher',
        github: 'https://github.com/gfish94',
        src: 'https://avatars.githubusercontent.com/u/130790771?v=4',
        favBreed: '',
    },
    {
        name: 'James Sheppard',
        github: 'https://github.com/Jshep23prog',
        src: 'https://avatars.githubusercontent.com/u/129888293?v=4',
        favBreed: 'Boxer',
    },
    {
        name: 'Sydney Andre',
        github: 'https://github.com/saandre0217',
        src: 'https://avatars.githubusercontent.com/u/133836158?v=4',
        favBreed: '',
    },
];

const mappedTechStack = techStack.map((tech, index) => {
    return (
        <Card key={index} style={{ margin: '10px', width: '200px', }}>
            <div style={{ display: 'flex', width: '150px', height: '150px', alignItems: "center", justifyContent: "center" }}>
                <Card.Img style={{ maxHeight: '125px', maxWidth: '125px' }} variant="top" src={tech.src} />
            </div>
            <Card.Body className='text-center' style={{ backgroundImage: 'linear-gradient(#182950, #274282)', color: 'white', width: '175px', borderRadius: '5px' }}>
                <Card.Text style={{ fontWeight: 'bold', margin: '0px' }}>{tech.name}</Card.Text>
                <Card.Text>{tech.description}</Card.Text>
            </Card.Body>
        </Card>
    )
})

const mappedMongeese = mongeese.map((mongoose, index) => {
    return (
        <Card key={index} style={{ width: '230px', margin: '10px', backgroundImage: 'linear-gradient(#182950, #274282)', border: 'white solid 2px' }}>
            <Card.Body className="text-center p-3" style={{ color: 'white', }} >

                <Card.Img src={mongoose.src}></Card.Img>
                <Card.Title className="my-3">{mongoose.name}</Card.Title>
                <Button className="mb-2" variant='outline-light' href={mongoose.github}>Github Profile</Button>

            </Card.Body>
        </Card >
    )
})

const About = () => (
    <Container>
        <Row>
            <Col style={{
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <h1 className="display-3">🎲 How to Play</h1>
                <h3>Dogagatchi+ features three interdependent game modes</h3>
                <ul>
                    <li> Pooch Picker: Earn coins by correctly identifying the breeds of pictured pups. Each correct guess earns you a coin and the dog will be added to your list of purchasable dogs! </li>
                    <li> My Kennel: Be a pack leader! Add dogs to your kennel with the coins earned and manage their hunger and happiness levels by walking, feeding and treating them as needed.</li>
                    <li> Bone Appetite Cafe: Spend your loot to treat your canine besties to finest snacks on the internet. </li>
                </ul>
                <h1 className="display-3">About the Developers 😎</h1>
                <h3>The Fighting Mongeese is a quixotic, quotable quintuple featuring the following players: </h3>
                <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(15em, 100%), 1fr))', }}>
                    {mappedMongeese}
                </div>
                <h1 className="display-3">🖥️ Tech Stack</h1>
                <h3>Dogagatchi+ was built with the following technologies: </h3>
                <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(12rem, 100%), 1fr))', }}>
                    {mappedTechStack}
                </div>
            </Col>
        </Row>
    </Container>
)

export default About