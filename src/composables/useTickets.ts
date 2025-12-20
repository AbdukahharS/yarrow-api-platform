import { ref, computed } from 'vue'
import type { Ticket, Message, NewTicketData, Attachment } from '@/types/support'

const tickets = ref<Ticket[]>([
  {
    id: '1',
    ticketNumber: '#2456',
    title: 'API rate limit question',
    status: 'open',
    priority: 'medium',
    messageCount: 7,
    updatedAt: '2 hours ago',
    messages: [
      {
        id: '1',
        sender: 'user',
        content:
          "Hi, I'm experiencing rate limiting even though I'm within my quota. Can you help?",
        timestamp: '2 hours ago',
      },
      {
        id: '2',
        sender: 'support',
        content:
          "Hello! I'd be happy to help you with this issue. Can you provide your API key (first 8 characters only) and the approximate time when you encountered the rate limiting?",
        timestamp: '1 hour ago',
      },
      {
        id: '3',
        sender: 'user',
        content:
          'Sure! The API key is sk_live_a1b2c3d4 and I encountered this around 09:30 AM today.',
        timestamp: '45 minutes ago',
      },
      {
        id: '4',
        sender: 'user',
        content:
          'Sure! The API key is sk_live_a1b2c3d4 and I encountered this around 09:30 AM today.',
        timestamp: '45 minutes ago',
      },
      {
        id: '5',
        sender: 'user',
        content:
          'Sure! The API key is sk_live_a1b2c3d4 and I encountered this around 09:30 AM today.',
        timestamp: '45 minutes ago',
      },
      {
        id: '6',
        sender: 'user',
        content:
          'Sure! The API key is sk_live_a1b2c3d4 and I encountered this around 09:30 AM today.',
        timestamp: '45 minutes ago',
      },
      {
        id: '7',
        sender: 'user',
        content:
          'Sure! The API key is sk_live_a1b2c3d4 and I encountered this around 09:30 AM today.',
        timestamp: '45 minutes ago',
      },
    ],
  },
  {
    id: '2',
    ticketNumber: '#2455',
    title: 'Billing inquiry',
    status: 'closed',
    priority: 'low',
    messageCount: 5,
    updatedAt: '1 day ago',
    messages: [
      {
        id: '1',
        sender: 'user',
        content: 'I have a question about my last invoice.',
        timestamp: '1 day ago',
      },
      {
        id: '2',
        sender: 'support',
        content:
          'Sure, I can help with billing questions. What would you like to know?',
        timestamp: '1 day ago',
      },
    ],
  },
  {
    id: '3',
    ticketNumber: '#2454',
    title: 'Authentication error',
    status: 'in-progress',
    priority: 'high',
    messageCount: 8,
    updatedAt: '3 hours ago',
    messages: [
      {
        id: '1',
        sender: 'user',
        content: 'Getting 401 errors on all my API calls suddenly.',
        timestamp: '3 hours ago',
      },
      {
        id: '2',
        sender: 'support',
        content:
          'We are investigating this issue. It appears there might be a service disruption.',
        timestamp: '2 hours ago',
      },
    ],
  },
  {
    id: '4',
    ticketNumber: '#2453',
    title: 'Feature request: webhooks',
    status: 'open',
    priority: 'low',
    messageCount: 2,
    updatedAt: '2 days ago',
    messages: [
      {
        id: '1',
        sender: 'user',
        content:
          'Would love to see webhook support for real-time notifications.',
        timestamp: '2 days ago',
      },
      {
        id: '2',
        sender: 'support',
        content:
          'Thank you for the suggestion! I have forwarded this to our product team.',
        timestamp: '2 days ago',
      },
    ],
  },
  {
    id: '5',
    ticketNumber: '#2452',
    title: 'Connection timeout issues',
    status: 'closed',
    priority: 'high',
    messageCount: 12,
    updatedAt: '3 days ago',
    messages: [
      {
        id: '1',
        sender: 'user',
        content: 'Experiencing frequent connection timeouts.',
        timestamp: '3 days ago',
      },
      {
        id: '2',
        sender: 'support',
        content:
          'This issue has been resolved. The timeout was due to a network configuration issue on our end.',
        timestamp: '3 days ago',
      },
    ],
  },
])

const selectedTicketId = ref<string | null>('1')

export function useTickets() {
  const selectedTicket = computed(() => {
    return tickets.value.find((t) => t.id === selectedTicketId.value) || null
  })

  const selectTicket = (ticketId: string) => {
    selectedTicketId.value = ticketId
  }

  const sendMessage = (content: string, files: File[] = []) => {
    if (!content.trim() && files.length === 0) return
    if (!selectedTicket.value) return

    // Convert files to attachments (in a real app, you'd upload these to a server)
    const attachments: Attachment[] = files.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file), // Creates a temporary local URL
    }))

    const message: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: content.trim(),
      timestamp: 'Just now',
      attachments: attachments.length > 0 ? attachments : undefined,
    }

    selectedTicket.value.messages.push(message)
    selectedTicket.value.messageCount++
    selectedTicket.value.updatedAt = 'Just now'
  }

  const createTicket = (data: NewTicketData) => {
    const ticketNumber = `#${2456 + tickets.value.length}`
    const newTicket: Ticket = {
      id: Date.now().toString(),
      ticketNumber,
      title: data.title,
      status: 'open',
      priority: data.priority,
      messageCount: 1,
      updatedAt: 'Just now',
      messages: [
        {
          id: '1',
          sender: 'user',
          content: data.message,
          timestamp: 'Just now',
        },
      ],
    }

    tickets.value.unshift(newTicket)
    selectedTicketId.value = newTicket.id
  }

  return {
    tickets,
    selectedTicketId,
    selectedTicket,
    selectTicket,
    sendMessage,
    createTicket,
  }
}
