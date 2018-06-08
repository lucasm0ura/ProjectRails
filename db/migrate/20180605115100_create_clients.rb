class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.string :document
      t.string :name
      t.string :contact_name
      t.string :address
      t.string :neighborhood
      t.string :city
      t.string :state
      t.string :zipcode
      t.string :phone_number
      t.string :email
      t.string :celphone

      t.timestamps
    end
  end
end
