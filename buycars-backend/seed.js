const db = require('./models');

async function seed() {
  console.log('🌱 Starting seed process...');
  try {
    await db.MarketplaceInventory.destroy({ where: {} });
    await db.OemSpec.destroy({ where: {} });
    await db.Dealer.destroy({ where: {} });
    console.log('🧹 Old data cleared.');

    const dealer = await db.Dealer.create({
      full_name: 'Rajesh Kumar',
      email: 'rajesh.k@example.com',
      password_hash: 'dummy_password_hash',
    });
    console.log('👤 Dealer created.');

    const hondaSpec = await db.OemSpec.create({ make: 'Honda', model_name: 'City', model_year: 2015 });
    const kiaSpec = await db.OemSpec.create({ make: 'Kia', model_name: 'Seltos', model_year: 2021 });
    const marutiSpec = await db.OemSpec.create({ make: 'Maruti', model_name: 'Swift', model_year: 2018 });
    console.log('🚗 OEM Specs created.');

    await db.MarketplaceInventory.bulkCreate([
      {
        title: '2015 Honda City VX',
        kms_on_odometer: 25000,
        listingPrice: 850000,
        color: 'Red',
        registration_place: 'New Delhi',
        imageUrl: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/26755/city-4th-generation-exterior-right-front-three-quarter.jpeg?q=80',
        description: ['Petrol Engine, Automatic', 'Only 25,000 KMs driven', 'First Owner, full insurance', 'No scratches, showroom condition', 'Top model with sunroof'],
        dealer_id: dealer.id,
        oem_spec_id: hondaSpec.id,
      },
      {
        title: '2021 Kia Seltos GTX',
        kms_on_odometer: 15000,
        listingPrice: 1700000,
        color: 'Red',
        registration_place: 'Mumbai',
        imageUrl: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/33372/seltos-exterior-right-front-three-quarter-3.jpeg?q=80',
        description: ['Petrol Turbo, Automatic', '15,000 KMs driven', 'Ventilated Seats', 'Bose Sound System', 'Under warranty'],
        dealer_id: dealer.id,
        oem_spec_id: kiaSpec.id,
      },
       {
        title: '2018 Maruti Swift ZXI',
        kms_on_odometer: 60000,
        listingPrice: 650000,
        color: 'Red',
        registration_place: 'Bangalore',
        imageUrl: 'https://imgd.aeplcdn.com/1280x720/n/cw/ec/26742/swift-exterior-right-front-three-quarter-2.jpeg?q=80',
        description: ['Petrol Engine, Manual', '60,000 KMs driven', 'Single owner', 'Excellent mileage', 'Recently serviced'],
        dealer_id: dealer.id,
        oem_spec_id: marutiSpec.id,
      },
    ]);
    console.log('✅ Inventory listings created.');

  } catch (error) {
    console.error('🔥 Seeding failed:', error);
  } finally {
    await db.sequelize.close();
    console.log('🏁 Seed process finished.');
  }
}

seed();