class Client < ActiveRecord::Base
  
  validates :name, presence: true
  validates :document, presence: true
  validates :contact_name, presence: true
  validates :address, presence: true
  validates :neighborhood, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :zipcode, presence: true

end
