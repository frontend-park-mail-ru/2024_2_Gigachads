import Email from "../../api/modules/email.js";

class Inbox {
    constructor() {
        this.templatesLoaded = this.loadTemplates();
    }
    async loadTemplates() {
      const [mail_messageResponse, buttonResponse, inboxResponse, element_menuResponse] = await Promise.all([
          fetch('/src/components/dumb/mail_message/mail_message-template.hbs'),
          fetch('/src/components/dumb/button/button-template.hbs'),
          fetch('/src/pages/inbox/inbox.hbs'),
          fetch('/src/components/dumb/element_menu/element_menu-template.hbs')
      ]);

      this.mail_messageString = await mail_messageResponse.text();
      this.buttonTemplateString = await buttonResponse.text();
      this.inboxString = await inboxResponse.text();
      this.element_menuString = await element_menuResponse.text();
    }
    async render() {
            await this.templatesLoaded;
            Handlebars.registerPartial('button-template', this.buttonTemplateString);
            Handlebars.registerPartial('mail_message-template', this.mail_messageString);
            Handlebars.registerPartial('element_menu-template', this.element_menuString);
            const inboxTemplate = Handlebars.compile(this.inboxString);
            const messages_json = await Email.getMessages();
            console.log(messages_json);
            const authFormData = {
                menu_elements: [
                    {
                        url: '/public/icons/inbox.svg',
                        element_text: 'Inbox',
                        active: true,
                        count: 3
                    },
                    {
                        url: '/public/icons/star.svg',
                        element_text: 'Starred',
                        active: false,
                        count: 0
                    },
                    {
                        url: '/public/icons/snooze.svg',
                        element_text: 'Snoozed',
                        active: false,
                        count: 0
                    },
                    {
                        url: '/public/icons/sent.svg',
                        element_text: 'Sent',
                        active: false,
                        count: 0
                    },
                    {
                        url: '/public/icons/draft.svg',
                        element_text: 'Drafts',
                        active: false,
                        count: 1
                    },
                    {
                        url: '/public/icons/spam.svg',
                        element_text: 'Spam',
                        active: false,
                        count: 3
                    },
                    {
                        url: '/public/icons/trash.svg',
                        element_text: 'Trash',
                        active: false,
                        count: 0
                    }
                ],

                mail_messages: [
                    {
                        author: 'Alice Wonderland',
                        badge_text: 'Important',
                        badge_type: 'important',
                        text: 'Meeting Reminder',
                        description: 'Don\'t forget about the meeting tomorrow at 10 AM',
                        date: '2023-10-05'
                    },
                    {
                        author: 'Bob Builder',
                        badge_text: 'Work',
                        badge_type: 'work',
                        text: 'Project Update',
                        description: 'The project is on track and will be completed by the end of the month',
                        date: '2023-10-04'
                    },
                    {
                        author: 'Charlie Brown',
                        badge_text: 'Personal',
                        badge_type: 'personal',
                        text: 'Weekend Plans',
                        description: 'Let\'s go hiking this weekend!',
                        date: '2023-10-03'
                    },
                    {
                        author: 'Diana Prince',
                        badge_text: 'Urgent',
                        badge_type: 'urgent',
                        text: 'Security Alert',
                        description: 'Please update your password immediately',
                        date: '2023-10-02'
                    },
                    {
                        author: 'Eve Online',
                        badge_text: 'Info',
                        badge_type: 'info',
                        text: 'Newsletter',
                        description: 'Check out our latest newsletter for updates',
                        date: '2023-10-01'
                    },
                    {
                        author: 'Frank Underwood',
                        badge_text: 'Politics',
                        badge_type: 'politics',
                        text: 'Campaign Update',
                        description: 'Join us for the next campaign rally',
                        date: '2023-09-30'
                    },
                    {
    
                        author: 'Grace Hopper',
                        badge_text: 'Tech',
                        badge_type: 'tech',
                        text: 'New Programming Language',
                        description: 'Introducing a new programming language that will revolutionize the industry',
                        date: '2023-09-29'
                    },
                    {
        
                        author: 'Hank Schrader',
                        badge_text: 'Alert',
                        badge_type: 'alert',
                        text: 'Suspicious Activity',
                        description: 'We have detected suspicious activity on your account',
                        date: '2023-09-28'
                    },
                    {
                        
                        author: 'Ivy League',
                        badge_text: 'Education',
                        badge_type: 'education',
                        text: 'Scholarship Opportunities',
                        description: 'Apply now for scholarships available for the next academic year',
                        date: '2023-09-27'
                    },
                    {
                        
                        author: 'Jack Sparrow',
                        badge_text: 'Adventure',
                        badge_type: 'adventure',
                        text: 'Treasure Hunt',
                        description: 'Join us for an exciting treasure hunt this weekend',
                        date: '2023-09-26'
                    },
                    {
                        
                        author: 'Katherine Johnson',
                        badge_text: 'Science',
                        badge_type: 'science',
                        text: 'Space Mission',
                        description: 'Details about the upcoming space mission',
                        date: '2023-09-25'
                    },
                    {
                        
                        author: 'Leonardo Da Vinci',
                        badge_text: 'Art',
                        badge_type: 'art',
                        text: 'Exhibition Opening',
                        description: 'Attend the grand opening of the new art exhibition',
                        date: '2023-09-24'
                    },
                    {
                        
                        author: 'Marie Curie',
                        badge_text: 'Research',
                        badge_type: 'research',
                        text: 'New Discoveries',
                        description: 'Read about the latest discoveries in the field of chemistry',
                        date: '2023-09-23'
                    },
                    {
                        
                        author: 'Nikola Tesla',
                        badge_text: 'Innovation',
                        badge_type: 'innovation',
                        text: 'New Invention',
                        description: 'Presenting a new invention that will change the world',
                        date: '2023-09-22'
                    },
                    {
                        
                        author: 'Oscar Wilde',
                        badge_text: 'Literature',
                        badge_type: 'literature',
                        text: 'Book Release',
                        description: 'Announcing the release of a new book',
                        date: '2023-09-21'
                    },
                    {
                        
                        author: 'Pablo Picasso',
                        badge_text: 'Art',
                        badge_type: 'art',
                        text: 'Art Workshop',
                        description: 'Join us for an art workshop this weekend',
                        date: '2023-09-20'
                    },
                    {
                        author: 'Quentin Tarantino',
                        badge_text: 'Film',
                        badge_type: 'film',
                        text: 'New Movie',
                        description: 'Watch the trailer for the upcoming movie',
                        date: '2023-09-19'
                    },
                    {
                        
                        author: 'Rosa Parks',
                        badge_text: 'History',
                        badge_type: 'history',
                        text: 'Historical Event',
                        description: 'Learn about a significant historical event',
                        date: '2023-09-18'
                    },
                    {
                        
                        author: 'Steve Jobs',
                        badge_text: 'Tech',
                        badge_type: 'tech',
                        text: 'Product Launch',
                        description: 'Introducing a new product that will change the market',
                        date: '2023-09-17'
                    }
                ]
            };
        
            
            console.log(authFormData);
            return inboxTemplate(authFormData);
    }
    attachEventListeners() {
    }
}

export default Inbox;