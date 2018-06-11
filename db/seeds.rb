# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Role.find_or_create_by(:name => 'Administrator')

@user = User.find_by(email: "desenvolvimento@lsmdev.com.br")
if @user.nil?
   User.create(:name => "Administrador", :email => "desenvolvimento@lsmdev.com.br", :password => "@devlsm2018", :password_confirmation => "@devlsm2018", :role_id => 1 )
end