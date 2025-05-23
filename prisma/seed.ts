import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create test devices
  const devices = await Promise.all([
    prisma.device.create({
      data: {
        serial_number: 'DEV001',
        type: 'Laptop',
        model: 'MacBook Pro',
        location: 'Office 101',
        status: 'active',
        purchase_date: new Date('2023-01-01'),
        warranty_expiry: new Date('2026-01-01'),
      },
    }),
    prisma.device.create({
      data: {
        serial_number: 'DEV002',
        type: 'Monitor',
        model: 'Dell U2719D',
        location: 'Office 102',
        status: 'active',
        purchase_date: new Date('2023-02-01'),
        warranty_expiry: new Date('2026-02-01'),
      },
    }),
    prisma.device.create({
      data: {
        serial_number: 'DEV003',
        type: 'Keyboard',
        model: 'Logitech MX Keys',
        location: 'Office 103',
        status: 'maintenance',
        purchase_date: new Date('2023-03-01'),
        warranty_expiry: new Date('2026-03-01'),
      },
    }),
  ])

  console.log('Seeded database with test devices:', devices)
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 