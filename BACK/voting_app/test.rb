require 'digest/md5'
require 'date'

# my_string = "coucou"
# d = DateTime.now.strftime("%Y%m%d%I%M")

# print Digest::MD5.hexdigest(my_string)


# print d + my_string

intitule = 'ivato'

secret = Digest::MD5.hexdigest(intitule + DateTime.now.strftime('%Y%m%d%I%M'))
