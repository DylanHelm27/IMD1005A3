let desc = document.getElementById('desc')

const passions =
{
    p1:"I first fell in love with WWE in 2009, I had a friend who watched, and he invited me to watch a show. I went through a massive fan phase from 2010-2013, but then skipped 2014, and got back into it in 2015, and have been inveted since. I love it because of the stories. The long form storytelling makes moments much more impactful when they happen. A season of a show can last for half a year, the last big wrestlingstoryline recquired 20 years of context and at minimum 2 years of attention.",
    p2:"The Tobey Maguire Spider-Man movies were the first movies I ever connected with. My dad and I had the 60's spider-man show on when I was a kid as well, so he's a character who will always hold a special spot in my heart.",
    p3:"Puzzles are a great relaxing hobby, I put lego in the same category. I love putting on a podcast and spending a day working on a puzzle ",
    p4:"Stoicism is defined as 'teaches the development of self-control and fortitude as a means of overcoming destructive emotions' according to Wikipedia. This is a more recent hobby, but it's one that I enjoy, as I'm slowly reading through Meditations and marking off important sentences that stand out to me",
    p5:"I grew up like most kids my age with a wii, my parents downloaded mario from the eshop so i grew up playing those games with them. Nowadays through humble bundels and steam sales I have a backlog of over 500 games. Maybe I'll find time someday. ",
    p6:"The Batman (2022) is a movie that stuck with me in the same way spider-man movies did as a kid. The direction of a slow burn detective film instead of a traditional action film was the right choice, and I think this film is easily better than the dark knight.",
    p7:"Until recently I never learned how to cook, but a new years resolution for 2023 was to learn how to. I bought HelloFresh and cooked every meal it came with, and now feel comfortable to meal prep and cook for my girlfriend. ",
    p8:"I love coding for the same reason I love puzzles, I view pieces of the code as puzzle pieces, and bug testing (to a certain extent) are fun to hunt for and solve. This is the reason webdev was my favourite course of the year."
}

let theta = Math.PI / 4.0;
let new_theta = 0.0;
let new_x = 0.0;
let new_y = 0.0;
let wheel_radius = 200.00;
let wheel_theta = 0.0;
const cards = document.querySelectorAll('.card2');
const wheel = document.querySelector('.wheel');
let center = {
    x: parseFloat(getComputedStyle(cards[0]).left),
    y: parseFloat(getComputedStyle(cards[0]).top)
}


cards.forEach((card, index) => {
    new_theta = theta * index;
    new_x = (Math.cos(new_theta) * wheel_radius);
    new_y = (-1.0 * Math.sin(new_theta) * wheel_radius);

    // place the cards on the wheel
    card.style.left = `${center.x + new_x}px`;
    card.style.top = `${center.y + new_y}px`;
});

let wheel_in_progress = false;
let snap_in_progress = false;

document.addEventListener('wheel', event => {
    if (snap_in_progress) {
        return;
    } else {
        clearTimeout(wheel_in_progress);
        // let scroll_speed = event.deltaY * 0.002;
        let scroll_speed = (event.deltaY / 360) * 20;

        wheel_theta = wheel_theta + scroll_speed;
        wheel.style.transitionDelay = '0.0s';
        wheel.style.transitionDuration = '0.0s';
        wheel.style.transform = `translate(-50%, -50%) rotate(${wheel_theta}deg)`;

        cards.forEach(card => {
            card.style.transitionDelay = '0.0s';
            card.style.transitionDuration = '0.0s';
            card.style.transform = `translate(-50%, -50%) rotate(${-1.0 * wheel_theta}deg)`;
        });

        wheel_in_progress = setTimeout(() => {
            snap_back();
        }, 100)
    }
});

const center_of_wheel = {
    x: parseFloat(getComputedStyle(wheel).left),
    y: parseFloat(getComputedStyle(wheel).top)
}

const snap_point = {
    x: cards[2].getBoundingClientRect().x + 100,
    y: cards[2].getBoundingClientRect().y + 100
}
snap_point.theta = Math.atan2(Math.abs(snap_point.y - center_of_wheel.y), Math.abs(snap_point.x - center_of_wheel.x));
snap_point.theta = snap_point.theta * (180 / Math.PI);

function get_center()
{
    center.x = parseFloat(getComputedStyle(cards[0]).left);
    center.y = parseFloat(getComputedStyle(cards[0]).top);
}

function snap_back() {
    get_center();
    snap_in_progress = true;
    let shortest_distance = Math.pow(((cards[3].getBoundingClientRect().x + 100) - snap_point.x), 2) + Math.pow(((cards[3].getBoundingClientRect().y + 100) - snap_point.y), 2);
    shortest_distance = Math.sqrt(shortest_distance);
    let closest_card = null;

    cards.forEach((card, index) => {
        let dx = (card.getBoundingClientRect().x + 100) - snap_point.x;
        let dy = (card.getBoundingClientRect().y + 100) - snap_point.y;
        let current_distance = Math.pow(dx, 2) + Math.pow(dy, 2);
        current_distance = Math.sqrt(current_distance)

        if (shortest_distance >= current_distance) {
            shortest_distance = current_distance;
            closest_card = card;
        }
    });

    let closest_cards_x = closest_card.getBoundingClientRect().x + 100;
    let closest_cards_y = closest_card.getBoundingClientRect().y + 100;

    let closest_cards_theta = Math.atan2(Math.abs(closest_cards_y - center_of_wheel.y), Math.abs(closest_cards_x - center_of_wheel.x));
    closest_cards_theta = closest_cards_theta * (180 / Math.PI);

    let theta_between = Math.abs(closest_cards_theta - snap_point.theta);

    // make a positive or negative degree shift
    if (closest_cards_x > center_of_wheel.x && closest_cards_y <= center_of_wheel.y) { // QI
        theta_between = closest_cards_theta > snap_point.theta ? theta_between : -1.0 * theta_between;
    } else if (closest_cards_x <= center_of_wheel.x && closest_cards_y <= center_of_wheel.y) { // QII
        theta_between = closest_cards_theta > snap_point.theta ? -1.0 * theta_between : theta_between;
    } else if (closest_cards_x <= center_of_wheel.x && closest_cards_y > center_of_wheel.y) { // QIII
        theta_between = closest_cards_theta > snap_point.theta ? theta_between : -1.0 * theta_between;
    } else if (closest_cards_x > center_of_wheel.x && closest_cards_y >= center_of_wheel.y) { // QIV
        theta_between = closest_cards_theta > snap_point.theta ? -1.0 * theta_between : theta_between;
    }

    wheel.style.transitionDelay = '0.1s';
    wheel.style.transitionDuration = '1.0s';
    wheel.style.transform = `translate(-50%, -50%) rotate(${wheel_theta + theta_between}deg)`;

    cards.forEach(card => {
        card.style.transitionDelay = '0.1s';
        card.style.transitionDuration = '1.0s'

        if (closest_card == card) {
            card.style.transform = `translate(-50%, -50%) rotate(${-1.0 * (wheel_theta + theta_between)}deg) scale(1.0)`;
            console.log(card);
            card.style.zIndex = 100;
            desc.innerHTML = `    
            
            <h2>${card.alt}</h2>
            <p>${passions [card.dataset.caption]}</p>
            
        
        `
        } else {
            card.style.transform = `translate(-50%, -50%) rotate(${-1.0 * (wheel_theta + theta_between)}deg) scale(0.1)`;
            card.style.zIndex = 1;
     }
    });

    wheel_theta = wheel_theta + theta_between;

    setTimeout(() => {
        snap_in_progress = false;
    }, 200);

    console.log(passions[closest_card.dataset.caption])

}