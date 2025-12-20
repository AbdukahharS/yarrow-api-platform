<script setup lang="ts">
import type { Ticket } from '@/types/support'
import TicketListItem from './TicketListItem.vue'

defineProps<{
  tickets: Ticket[]
  selectedTicketId: string | null
}>()

defineEmits<{
  select: [ticketId: string]
}>()
</script>

<template>
  <div class="tickets-panel">
    <h3 class="panel-title">Your Tickets</h3>
    <div class="tickets-list">
      <TicketListItem
        v-for="ticket in tickets"
        :key="ticket.id"
        :ticket="ticket"
        :is-selected="selectedTicketId === ticket.id"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<style scoped>
.tickets-panel {
  width: 380px;
  flex-shrink: 0;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
}

.panel-title {
  font-size: 16px;
  margin: 0 24px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.tickets-list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
}
</style>
