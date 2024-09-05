<script setup lang="ts">

function handleAction() {
  // eslint-disable-next-line no-alert
  alert('clicked action button!')
}
</script>

<template>
  <AlertDialogRoot>
    <AlertDialogTrigger>
      <Button variant="gradient">Delete account</Button>
    </AlertDialogTrigger>
    <AlertDialogPortal>
      <AlertDialogOverlay/>
      <AlertDialogContent>
        <AlertDialogTitle>
          Are you absolutely sure?
        </AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </AlertDialogDescription>
        <div>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction @click="handleAction">
            Yes, delete account
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>